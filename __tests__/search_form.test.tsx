import { SearchForm, ThemeProvider } from '../src/svalka';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { mockNavigate } from '../entities/_test-utils/mocks.ts';

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
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
  );
  const searchInput = screen.getByRole('textbox');

  expect(searchInput).toBeInTheDocument();
});

test('search button mounts successfully', () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
  );

  const searchButton = screen.getByRole('button', { name: 'Search' });

  expect(searchButton).toBeInTheDocument();
});

test('search input has a placeholder', () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
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
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
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
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
  );

  const searchInput = screen.getByRole('textbox');

  expect(searchInput).toHaveValue('');

  vi.restoreAllMocks();
});

test('useNavigate is called when user clicks search button', async () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
  );
  await userEvent.type(screen.getByRole('textbox'), 'Rick');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(mockNavigate).toHaveBeenCalled();
});

test('useNavigate is called with correct link when user clicks search button', async () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
  );
  await userEvent.type(screen.getByRole('textbox'), 'Rick');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(mockNavigate).toBeCalledWith('/?name=Rick&page=1');
});

test('useNavigate is called with trimmed value in the link when user clicks search button', async () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
  );
  await userEvent.clear(screen.getByRole('textbox'));
  await userEvent.type(screen.getByRole('textbox'), ' Rick Sanchez  ');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(mockNavigate).toBeCalledWith('/?name=Rick%20Sanchez&page=1');
});

test('saves search term to localStorage when search button is clicked', async () => {
  localStorage.removeItem('searchQuery');

  render(
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
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
    <ThemeProvider>
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    </ThemeProvider>
  );

  const input = await screen.findByRole('textbox');
  const searchButton = await screen.findByRole('button', { name: 'Search' });

  await userEvent.clear(input);
  await userEvent.type(input, '  abra kadabra ');
  await userEvent.click(searchButton);

  expect(localStorage.getItem('searchQuery')).toBe('abra kadabra');
});
