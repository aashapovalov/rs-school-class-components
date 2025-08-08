import type { Character, Info } from '@/shared/types';

export const mockNavigate = vi.fn();

export const createMockArrayCharacter = (): Character => ({
  id: 444,
  name: 'Multiverse Cop Rick',
  status: 'unknown',
  species: 'Human',
  type: 'Enforcer',
  gender: 'Male',
  origin: { name: 'Earth (C-444)', url: '' },
  location: { name: 'Neo-Citadel', url: '' },
  image: './assets/test_card_img_rick_444.png',
  episode: ['https://rickandmortyapi.com/api/episode/44'],
  url: 'https://rickandmortyapi.com/api/character/444',
  created: '2025-01-01T00:00:00.000Z',
});

export const createMockArrayfFull = (): Character[] => [
  {
    id: 1,
    name: 'Developer Rick',
    status: 'Alive',
    species: 'not human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Home alone', url: '' },
    image: './assets/test_card_img_developer_rick.png',
    episode: [],
    url: '',
    created: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'QA Morty',
    status: 'Dead',
    species: 'only a human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (Replacement Dimension)', url: '' },
    location: { name: 'At work', url: '' },
    image: './assets/test_card_image_qa_morty.png',
    episode: [],
    url: '',
    created: '2025-01-01T00:00:00.000Z',
  },
];

export const createInfo = (): Info => {
  return {
    pages: 1,
    count: 1,
    next: null,
    prev: null,
  };
};

export const createMockArrayEmpty = (): Character[] => [
  {
    id: 1,
    name: 'PM',
    status: 'Dead',
    species: '',
    type: '',
    gender: 'Male',
    origin: { name: '', url: '' },
    location: { name: 'At work', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
];

export const mockFetchError = vi.fn().mockResolvedValue({
  ok: false,
  json: () => Promise.resolve({ error: 'There is nothing here' }),
});

export const mockFetchCharacter = vi.fn().mockResolvedValue({
  ok: true,
  json: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ results: createMockArrayCharacter() });
      }, 100);
    }),
});

export const mockFetchList = vi.fn().mockResolvedValue({
  ok: true,
  json: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          info: createInfo(),
          results: createMockArrayfFull(),
        });
      }, 100);
    }),
});

export const createMockSearchParams = (params: Record<string, string>) => {
  return {
    get: (key: string) => params[key] ?? null,
  };
};

export function createMockCharacters(count: number): Character[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Character ${i + 1}`,
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: `Origin ${i + 1}`, url: '' },
    location: { name: `Location ${i + 1}`, url: '' },
    image: '',
    episode: [],
    url: '',
    created: '2025-01-01T00:00:00.000Z',
  }));
}

export const mockSelectedCharactersTwo: Character[] = [
  {
    id: 1,
    name: 'Developer Rick',
    status: 'Alive',
    species: 'not human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Home alone', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'QA Morty',
    status: 'Dead',
    species: 'only a human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (Replacement Dimension)', url: '' },
    location: { name: 'At work', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
];

export const mockSelectedCharactersOne: Character[] = [
  {
    id: 1,
    name: 'Developer Rick',
    status: 'Alive',
    species: 'not human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Home alone', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
];
