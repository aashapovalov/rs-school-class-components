import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, test, expect } from 'vitest';

import { App } from '../';

type Character = {
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
  image: string;
};

test('shows empty input when no saved term exists', async () => {
  localStorage.removeItem('searchQuery');
  render(<App />);
  const initialInput = await screen.findByRole('textbox');
  expect(initialInput).toHaveValue('');
});

test('displays previously saved search term from localStorage on mount', async () => {
  localStorage.setItem('searchQuery', 'Rick Sanchez');
  render(<App />);
  const initialInput = await screen.findByRole('textbox');
  expect(initialInput).toHaveValue('Rick Sanchez');
});

test('updates input value when user types', async () => {
  localStorage.removeItem('searchQuery');
  render(<App />);
  const input = await screen.findByRole('textbox');
  await userEvent.type(input, 'abrakadabra');
  expect(input).toHaveValue('abrakadabra');
});

test('saves search term to localStorage when search button is clicked', async () => {
  localStorage.removeItem('searchQuery');
  render(<App />);
  const input = await screen.findByRole('textbox');
  const searchButton = await screen.findByRole('button', { name: 'Search' });
  await userEvent.type(input, 'abrakadabra');
  await userEvent.click(searchButton);
  const valueLS = localStorage.getItem('searchQuery');
  expect(valueLS).toBe('abrakadabra');
});

test('saves search term to localStorage when search button is clicked', async () => {
  localStorage.removeItem('searchQuery');
  render(<App />);
  const input = await screen.findByRole('textbox');
  const searchButton = await screen.findByRole('button', { name: 'Search' });
  await userEvent.type(input, '  abra kadabra ');
  await userEvent.click(searchButton);
  const valueLS = localStorage.getItem('searchQuery');
  expect(valueLS).toBe('abra kadabra');
});

test('overwrites existing localStorage value when new search is performed', async () => {
  localStorage.removeItem('searchQuery');
  localStorage.setItem('searchQuery', 'Rick Sanchez');
  render(<App />);
  const input = await screen.findByRole('textbox');
  const searchButton = await screen.findByRole('button', { name: 'Search' });
  await userEvent.clear(input);
  await userEvent.type(input, '  abra kadabra ');
  await userEvent.click(searchButton);
  expect(localStorage.getItem('searchQuery')).toBe('abra kadabra');
});

test('triggers search callback with correct parameters', async () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;
  render(<App />);
  const urlBase: string = 'https://rickandmortyapi.com/api/character';
  const input = await screen.findByRole('textbox');
  const searchButton = await screen.findByRole('button', { name: 'Search' });
  await userEvent.clear(input);
  await userEvent.type(input, '  abra kadabra ');
  await userEvent.click(searchButton);
  expect(mockFetch).toBeCalledWith(`${urlBase}/?name=abra%20kadabra`);
});

test('Shows loading state while fetching data', async () => {
  const mockData: Character = {
    name: 'Morty Smith',
    status: 'alive',
    species: 'Human',
    location: {
      name: 'Earth',
    },
    image: '../assets/test_card_image_qa_morty.png',
  };
  const mockFetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ results: [mockData] });
        }, 100);
      }),
  });
  global.fetch = mockFetch;
  render(<App />);
  const searchButton = await screen.findByRole('button', { name: 'Search' });

  await userEvent.click(searchButton);

  const spinner = await screen.findByTestId('spinner');

  expect(spinner).toBeInTheDocument();
});

test('Displays "no results" message when data array is empty', async () => {
  const mockFetch = vi.fn().mockResolvedValue({
    ok: false,
    json: () => Promise.resolve({ error: 'There is nothing here' }),
  });
  global.fetch = mockFetch;

  render(<App />);

  const searchButton = await screen.findByRole('button', { name: 'Search' });
  await userEvent.click(searchButton);

  const noResultsError = await screen.findByAltText('No Results Error');

  expect(noResultsError).toBeInTheDocument();
});

test('Shows appropriate error for different HTTP status codes (4xx, 5xx)', async () => {
  const mockFetch = vi.fn().mockResolvedValue({
    ok: false,
    json: () =>
      Promise.resolve({
        error: 'Service is currently unavailable. Try again later.',
      }),
  });
  global.fetch = mockFetch;

  render(<App />);

  const searchButton = screen.getByRole('button', { name: 'Search' });
  await userEvent.click(searchButton);

  const errorMsg = await screen.findByText(
    'Service is currently unavailable. Try again later.'
  );

  expect(errorMsg).toBeInTheDocument();
});

test('Displays error message when API call fails', async () => {
  const mockFetch = vi
    .fn()
    .mockRejectedValue(new Error('Something went terribly wrong!'));
  global.fetch = mockFetch;

  render(<App />);

  const searchBtn = screen.getByRole('button', { name: 'Search' });
  await userEvent.click(searchBtn);

  const errorMsg = await screen.findByText('Something went terribly wrong!');

  expect(errorMsg).toBeInTheDocument();
});

test('spinner disappears when loading ends', async () => {
  const mockData: Character = {
    name: 'Morty Smith',
    status: 'alive',
    species: 'Human',
    location: {
      name: 'Earth',
    },
    image: '../assets/test_card_image_qa_morty.png',
  };
  const mockFetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ results: [mockData] }),
  });
  global.fetch = mockFetch;
  render(<App />);
  const searchButton = await screen.findByRole('button', { name: 'Search' });

  await userEvent.click(searchButton);

  await screen.findByText(mockData.name);

  expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
});
