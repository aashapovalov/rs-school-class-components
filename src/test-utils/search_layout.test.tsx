import { SearchLayout, SearchRequest, ThemeProvider } from '../components';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { createInfo, createMockArrayfFull, mockFetchList } from './mocks';
import { MemoryRouter, Route, Routes } from 'react-router';

screen.debug();

afterEach(() => {
  vi.restoreAllMocks();
});

test('triggers search callback with correct parameters of character list', async () => {
  global.fetch = mockFetchList;

  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchLayout />}>
            <Route index element={<SearchRequest />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );

  await userEvent.type(screen.getByRole('textbox'), 'Rick');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(mockFetchList).toBeCalledWith(
    'https://rickandmortyapi.com/api/character/?name=Rick&page=1'
  );
});

test('displays correct result list after getting response from api', async () => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({
      info: createInfo(),
      results: createMockArrayfFull(),
    }),
  } as unknown as Response);

  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchLayout />}>
            <Route index element={<SearchRequest />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );

  await userEvent.type(screen.getByRole('textbox'), 'Rick');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  const firstCharacterName = await screen.findByText('Developer Rick');
  const secondCharacterName = await screen.findByText('QA Morty');

  expect(firstCharacterName).toBeInTheDocument();
  expect(secondCharacterName).toBeInTheDocument();
});

test('displays character details when a character card is clicked', async () => {
  vi.spyOn(global, 'fetch').mockImplementation(
    (input: string | Request | URL): Promise<Response> => {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;

      if (url.includes('character/?')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            info: createInfo(),
            results: createMockArrayfFull(),
          }),
        } as Response);
      }

      if (url.includes('character/')) {
        return Promise.resolve({
          ok: true,
          json: async () => createMockArrayfFull()[0],
        } as Response);
      }

      return Promise.reject(new Error('Unknown fetch URL'));
    }
  );

  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchLayout />}>
            <Route index element={<SearchRequest />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );

  const characterCard = await screen.findByText('Developer Rick');
  expect(characterCard).toBeInTheDocument();

  await userEvent.click(characterCard);

  const characterDetail = await screen.findByText('Earth (C-137)');
  expect(characterDetail).toBeInTheDocument();
});
