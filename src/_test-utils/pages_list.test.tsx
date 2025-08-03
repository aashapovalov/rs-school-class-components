import { render, screen } from '@testing-library/react';
import { PagesList } from '../components';
import { MemoryRouter } from 'react-router';
import { createMockCharacters, mockNavigate } from './mocks';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

test('renders correct number of pagination buttons for 5 pages', () => {
  const info = { pages: 5, count: 100, next: '', prev: '' };
  const results = createMockCharacters(5);

  render(
    <MemoryRouter initialEntries={['/?name=Rick&page=1']}>
      <PagesList info={info} results={results} />
    </MemoryRouter>
  );

  const buttons = screen.getAllByRole('button');
  const pageButtons = buttons.filter((btn) =>
    /^\d+$/.test(btn.textContent ?? '')
  );

  expect(pageButtons).toHaveLength(5);
});

test('do not render pagination buttons for 1 page', () => {
  const info = { pages: 1, count: 200, next: '', prev: '' };
  const results = createMockCharacters(10);

  render(
    <MemoryRouter initialEntries={['/?name=Morty&page=1']}>
      <PagesList info={info} results={results} />
    </MemoryRouter>
  );

  const buttons = screen.queryAllByRole('button');
  const pageButtons = buttons.filter((btn) =>
    /^\d+$/.test(btn.textContent ?? '')
  );

  expect(pageButtons).toHaveLength(0);
});

test('mock with page 1', async () => {
  vi.doMock('react-router', async () => {
    const actual =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...actual,
      useSearchParams: () => [
        {
          get: (key: string) => {
            if (key === 'page') return '1';
            if (key === 'name') return 'Rick';
            return null;
          },
        },
        vi.fn(),
      ],
      useNavigate: () => vi.fn(),
    };
  });

  const { default: PagesList } = await import(
    '../components/display/pages_list'
  );

  render(
    <MemoryRouter>
      <PagesList
        info={{ pages: 5, count: 10, next: '', prev: '' }}
        results={[]}
      />
    </MemoryRouter>
  );

  const prevButton = screen.getByRole('button', { name: /previous/i });
  expect(prevButton).toBeDisabled();
});

test('mock with page 5', async () => {
  vi.doMock('react-router', async () => {
    const actual =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...actual,
      useSearchParams: () => [
        {
          get: (key: string) => {
            if (key === 'page') return '5';
            if (key === 'name') return 'Morty';
            return null;
          },
        },
        vi.fn(),
      ],
      useNavigate: () => vi.fn(),
    };
  });

  const { default: PagesList } = await import(
    '../components/display/pages_list'
  );

  render(
    <MemoryRouter>
      <PagesList
        info={{ pages: 5, count: 10, next: '', prev: '' }}
        results={[]}
      />
    </MemoryRouter>
  );

  const nextButton = screen.getByRole('button', { name: /next/i });
  expect(nextButton).toBeDisabled();
});

test('Clicking a page button triggers callback with correct page', async () => {
  vi.doMock('react-router', async () => {
    const actual =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
      useSearchParams: () => [
        {
          get: (key: string) => {
            if (key === 'page') return '1';
            if (key === 'name') return 'Rick';
            return null;
          },
        },
        vi.fn(),
      ],
    };
  });

  const { default: PagesList } = await import(
    '../components/display/pages_list'
  );

  render(
    <MemoryRouter>
      <PagesList
        info={{ pages: 5, count: 50, next: '', prev: '' }}
        results={[]}
      />
    </MemoryRouter>
  );

  await userEvent.click(screen.getByRole('button', { name: '3' }));

  expect(mockNavigate).toHaveBeenCalledWith('/?name=Rick&page=3');
});
