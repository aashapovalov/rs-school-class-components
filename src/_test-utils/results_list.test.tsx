import { ResultsList } from '../components';
import { screen, render } from '@testing-library/react';

import {
  createMockArrayfFull,
  createMockArrayEmpty,
  createInfo,
} from './mocks';
import { MemoryRouter } from 'react-router';

import fallbackImage from '../assets/fallback_card_image.png';

test('result list has approprite cards number', () => {
  const mockArray = createMockArrayfFull();
  const infoObj = createInfo();
  render(
    <MemoryRouter>
      <ResultsList results={mockArray} info={infoObj} />
    </MemoryRouter>
  );

  const numberOfChar: number = screen.getAllByTestId('character-card').length;

  expect(numberOfChar).toBe(mockArray.length);
});

test('if character image is empty fallback image renders successfully', () => {
  const mockArrayEmpty = createMockArrayEmpty();
  const infoObj = createInfo();

  render(
    <MemoryRouter>
      <ResultsList results={mockArrayEmpty} info={infoObj} />
    </MemoryRouter>
  );
  const charImg = screen.getByAltText('PM');

  expect(charImg).toHaveAttribute('src', fallbackImage);
});

test('character image renders successfully ', () => {
  const mockArray = createMockArrayfFull();
  const infoObj = createInfo();

  render(
    <MemoryRouter>
      <ResultsList results={mockArray} info={infoObj} />
    </MemoryRouter>
  );

  const charImgs = screen.getAllByRole('img');
  expect(charImgs.length).toBeGreaterThan(0);
  expect(charImgs[0]).toBeInTheDocument();
});

test('character image has alt property', () => {
  const mockArray = createMockArrayfFull();
  const infoObj = createInfo();

  render(
    <MemoryRouter>
      <ResultsList results={mockArray} info={infoObj} />
    </MemoryRouter>
  );

  const charImgAlt = screen.getByAltText(mockArray[0].name);

  expect(charImgAlt).toBeInTheDocument();
});

test('character name renders successfully', () => {
  const mockArray = createMockArrayfFull();
  const infoObj = createInfo();

  render(
    <MemoryRouter>
      <ResultsList results={mockArray} info={infoObj} />
    </MemoryRouter>
  );

  const charName = screen.getByRole('heading', {
    level: 2,
    name: 'Developer Rick',
  });

  expect(charName).toBeInTheDocument();
});
