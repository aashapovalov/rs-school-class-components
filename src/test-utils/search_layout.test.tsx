import { SearchLayout, SearchRequest } from '../components';

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
    <MemoryRouter initialEntries={['/search']}>
      <Routes>
        <Route path="/search" element={<SearchLayout />}>
          <Route index element={<SearchRequest />} />
        </Route>
      </Routes>
    </MemoryRouter>
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
    <MemoryRouter initialEntries={['/search']}>
      <Routes>
        <Route path="/search" element={<SearchLayout />}>
          <Route index element={<SearchRequest />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  await userEvent.type(screen.getByRole('textbox'), 'Rick');
  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  const firstCharacterName = await screen.findByText('Developer Rick');
  const secondCharacterName = await screen.findByText('QA Morty');

  expect(firstCharacterName).toBeInTheDocument();
  expect(secondCharacterName).toBeInTheDocument();
});

/*test('No results message is shown when API returns empty array', async () => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: false,
    json: async () => ({
      error: '',
    }),
  } as unknown as Response);

  render(
    <MemoryRouter initialEntries={['/search']}>
      <Routes>
        <Route path="/search" element={<SearchLayout />}>
          <Route index element={<SearchRequest />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  await userEvent.click(screen.getByRole('button', { name: 'Search' }));

  const errorImage = await screen.findByAltText(/error/i);
  expect(errorImage).toBeInTheDocument();
});*/

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
    <MemoryRouter initialEntries={['/search?name=Rick&page=1']}>
      <Routes>
        <Route path="/search" element={<SearchLayout />}>
          <Route index element={<SearchRequest />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  const characterCard = await screen.findByText('Developer Rick');
  expect(characterCard).toBeInTheDocument();

  await userEvent.click(characterCard);

  const characterDetail = await screen.findByText('Earth (C-137)');
  expect(characterDetail).toBeInTheDocument();
});

/*
import { render, screen } from '@testing-library/react';

import { SearchRequest } from '../components';
import {
  createMockSearchParams,
  mockFetchCharacter,
  mockFetchList,
} from './mocks';

let mockParams: Record<string, string> = {};

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useSearchParams: () => [
      {
        get: (key: string) => mockParams[key] ?? null,
      },
      vi.fn(),
    ],
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('triggers search callback with correct parameters of character list', async () => {
  mockParams = { name: 'Rick', page: '1' };
  global.fetch = mockFetchList;

  const { SearchRequest } = await import('../components'); // ✅ Delay import until after mock is applied

  render(<SearchRequest />);

  expect(mockFetchList).toBeCalledWith(
    'https://rickandmortyapi.com/api/character/?name=Rick&page=1'
  );
});

test('triggers search callback with correct parameters of character details', () => {
  vi.mock('react-router', async () => {
    const actual =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...actual,
      useSearchParams: () => [createMockSearchParams('1'), vi.fn()],
    };
  });

  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  render(<SearchRequest />);

  expect(mockFetch).toBeCalledWith(
    'https://rickandmortyapi.com/api/character/1'
  );
});

test('when url contains only name and page, mounts character list and do not mount character details', async () => {
  vi.mock('react-router', async () => {
    const actual =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...actual,
      useSearchParams: () => [createMockSearchParams(''), vi.fn()],
    };
  });

  global.fetch = mockFetchCharacter;
  global.fetch = mockFetchList;

  render(<SearchRequest />);

  const characterNameCard = await screen.findByText('Developer Rick');
  expect(characterNameCard).toBeInTheDocument();
});

/*


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
*/
