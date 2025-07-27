import { SearchForm } from '../components';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { mockNavigate } from './mocks';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

test('search input mounts successfully', () => {
  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );
  const searchInput = screen.getByRole('textbox');

  expect(searchInput).toBeInTheDocument();
});

test('search button mounts successfully', () => {
  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const searchButton = screen.getByRole('button', { name: 'Search' });

  expect(searchButton).toBeInTheDocument();
});

test('search input has a placeholder', () => {
  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText('Search for a character...');

  expect(searchInput).toBeInTheDocument();
});

test('search input shows value stored in LS', () => {
  vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(
    (key) => {
      return key === 'searchQuery' ? 'Rick' : null;
    }
  );
  vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(
    () => {}
  );

  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const searchInput = screen.getByRole('textbox');

  expect(searchInput).toHaveValue('Rick');

  vi.restoreAllMocks();
});

test('shows empty input when there is no saved value in LS', () => {
  vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(
    (key) => {
      return key === 'searchQuery' ? '' : null;
    }
  );
  vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(
    () => {}
  );

  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const searchInput = screen.getByRole('textbox');

  expect(searchInput).toHaveValue('');

  vi.restoreAllMocks();
});

test('useNavigate is called when user clicks search button', async () => {
  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );
  await userEvent.type(screen.getByRole('textbox'), 'Rick');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(mockNavigate).toHaveBeenCalled();
});

test('useNavigate is called with correct link when user clicks search button', async () => {
  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );
  await userEvent.type(screen.getByRole('textbox'), 'Rick');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(mockNavigate).toBeCalledWith('/search?name=Rick&page=1');
});

test('useNavigate is called with trimmed value in the link when user clicks search button', async () => {
  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );
  await userEvent.clear(screen.getByRole('textbox'));
  await userEvent.type(screen.getByRole('textbox'), ' Rick Sanchez  ');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(mockNavigate).toBeCalledWith('/search?name=Rick%20Sanchez&page=1');
});

test('saves search term to localStorage when search button is clicked', async () => {
  localStorage.removeItem('searchQuery');

  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );
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

  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const input = await screen.findByRole('textbox');
  const searchButton = await screen.findByRole('button', { name: 'Search' });

  await userEvent.clear(input);
  await userEvent.type(input, '  abra kadabra ');
  await userEvent.click(searchButton);

  expect(localStorage.getItem('searchQuery')).toBe('abra kadabra');
});
