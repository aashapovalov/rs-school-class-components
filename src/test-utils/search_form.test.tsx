import { SearchForm } from '../components';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const inputText: string = 'Text';
const mockInputChange = vi.fn();
const mockHandleSearch = vi.fn();

test('search input mounts successfully', () => {
  render(
    <SearchForm
      inputValue={inputText}
      onInputChange={mockInputChange}
      onSearchSubmit={mockHandleSearch}
    />
  );
  const searchInput = screen.getByRole('textbox');
  expect(searchInput).toBeInTheDocument();
});

test('search button mounts successfully', () => {
  render(
    <SearchForm
      inputValue={inputText}
      onInputChange={mockInputChange}
      onSearchSubmit={mockHandleSearch}
    />
  );
  const searchButton = screen.getByRole('button', { name: 'Search' });
  expect(searchButton).toBeInTheDocument();
});

test('search input has a placeholder', () => {
  render(
    <SearchForm
      inputValue={inputText}
      onInputChange={mockInputChange}
      onSearchSubmit={mockHandleSearch}
    />
  );
  const searchInput = screen.getByPlaceholderText('Search for a character...');
  expect(searchInput).toBeInTheDocument();
});

test('search input shows value passed in props', () => {
  render(
    <SearchForm
      inputValue={inputText}
      onInputChange={mockInputChange}
      onSearchSubmit={mockHandleSearch}
    />
  );
  const searchInput = screen.getByRole('textbox');
  expect(searchInput).toHaveValue('Text');
});

test('search function is called when user clicks search button', async () => {
  render(
    <SearchForm
      inputValue={inputText}
      onInputChange={mockInputChange}
      onSearchSubmit={mockHandleSearch}
    />
  );
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));
  expect(mockHandleSearch).toHaveBeenCalled();
});

test('search function is called with a value from props', async () => {
  render(
    <SearchForm
      inputValue={inputText}
      onInputChange={mockInputChange}
      onSearchSubmit={mockHandleSearch}
    />
  );
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));
  expect(mockHandleSearch).toHaveBeenCalledWith('Text');
});

test('imput handler function is called when user types value in input field', async () => {
  render(
    <SearchForm
      inputValue={inputText}
      onInputChange={mockInputChange}
      onSearchSubmit={mockHandleSearch}
    />
  );
  await userEvent.type(screen.getByRole('textbox'), 'Name');
  expect(mockInputChange).toHaveBeenCalled();
});
