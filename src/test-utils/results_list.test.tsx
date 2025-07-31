import { ResultsList } from '../components';
import { screen, render } from '@testing-library/react';

import fallbackImage from '../assets/fallback_card_image.png';

type Character = {
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
  image: string;
};

const characterList: Character[] = [
  {
    name: 'Developer Rick',
    status: 'alive',
    species: 'not human',
    location: {
      name: 'Home alone',
    },
    image: './assets/test_card_img_developer_rick.png',
  },
  {
    name: 'QA Morty',
    status: 'dead',
    species: 'only a human',
    location: {
      name: 'At work',
    },
    image: './assets/test_card_image_qa_morty.png',
  },
];

const characterListAlone = [
  {
    name: 'Developer Rick',
    status: 'alive',
    species: 'not human',
    location: {
      name: 'Home alone',
    },
    image: './assets/test_card_img_developer_rick.png',
  },
];

const characterListEmpty: Character[] = [
  {
    name: 'PM',
    status: 'dead',
    species: 'unknown',
    location: {
      name: 'unknown',
    },
    image: '',
  },
];

test('result list has approprite cards number', () => {
  render(<ResultsList results={characterList} />);

  const numberOfChar: number = screen.getAllByTestId('character-card').length;

  expect(numberOfChar).toBe(characterList.length);
});

test('if character image is empty fallback image renders successfully', () => {
  render(<ResultsList results={characterListEmpty} />);

  const charImg = screen.getByAltText('PM');

  expect(charImg).toHaveAttribute('src', fallbackImage);
});

test('character image renders successfully ', () => {
  render(<ResultsList results={characterListAlone} />);

  const charImg = screen.getByRole('img');

  expect(charImg).toBeInTheDocument();
});

test('character image has alt property', () => {
  render(<ResultsList results={characterListAlone} />);

  const charImgAlt = screen.getByAltText(characterList[0].name);

  expect(charImgAlt).toBeInTheDocument();
});

test('character name renders successfully', () => {
  render(<ResultsList results={characterListAlone} />);

  const charName = screen.getByRole('heading', {
    level: 2,
    name: 'Developer Rick',
  });

  expect(charName).toBeInTheDocument();
});

test('character alive status renders successfully', () => {
  render(<ResultsList results={characterListAlone} />);

  const charStatus = screen.getByTestId('alive-status');

  expect(charStatus).toHaveTextContent(characterList[0].status);
});

test('character species renders successfully', () => {
  render(<ResultsList results={characterListAlone} />);

  const charSpecies = screen.getByTestId('species');

  expect(charSpecies).toHaveTextContent(characterList[0].species);
});

test('character location renders successfully', () => {
  render(<ResultsList results={characterListAlone} />);

  const charLocation = screen.getByTestId('location');

  expect(charLocation).toHaveTextContent(characterList[0].location.name);
});
