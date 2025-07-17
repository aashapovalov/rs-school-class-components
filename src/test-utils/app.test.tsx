import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, test, expect } from 'vitest';

import { App } from '../';

/*type Character = {
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
  image: string;
};

type testAppState = {
  inputValue: string;
  searchResults: Character[];
  loading: boolean;
  error: string | null;
};*/

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
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'abrakadabra');
  expect(input).toHaveValue('abrakadabra');
});

test('saves search term to localStorage when search button is clicked', async () => {
  localStorage.removeItem('searchQuery');
  render(<App />);
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: 'Search' });
  await userEvent.type(input, 'abrakadabra');
  await userEvent.click(searchButton);
  const valueLS = localStorage.getItem('searchQuery');
  expect(valueLS).toBe('abrakadabra');
});

test('saves search term to localStorage when search button is clicked', async () => {
  localStorage.removeItem('searchQuery');
  render(<App />);
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: 'Search' });
  await userEvent.type(input, '  abra kadabra ');
  await userEvent.click(searchButton);
  const valueLS = localStorage.getItem('searchQuery');
  expect(valueLS).toBe('abra kadabra');
});

test('overwrites existing localStorage value when new search is performed', async () => {
  localStorage.removeItem('searchQuery');
  localStorage.setItem('searchQuery', 'Rick Sanchez');
  render(<App />);
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: 'Search' });
  await userEvent.clear(input);
  await userEvent.type(input, '  abra kadabra ');
  await userEvent.click(searchButton);
  expect(localStorage.getItem('searchQuery')).toBe('abra kadabra');
});

test('triggers search callback with correct parameters', async () => {
  render(<App />);
  const mockFetch = vi.fn();
  global.fetch = mockFetch;
  const urlBase: string = 'https://rickandmortyapi.com/api/character';
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: 'Search' });
  await userEvent.clear(input);
  await userEvent.type(input, '  abra kadabra ');
  await userEvent.click(searchButton);
  expect(mockFetch).toBeCalledWith(`${urlBase}/?name=abra%20kadabra`);
});
