import { screen, render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import { ResultsList } from '../src/entities';
import { useStore } from '@/state/zustand';

import {
  createMockArrayfFull,
  createMockArrayEmpty,
  createInfo,
} from '../src/shared/__test-setup/mocks';

import fallbackImage from '../assets/fallback_card_image.png';

afterEach(() => {
  useStore.setState({ selectedCharacters: [] });
});

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

test('click on character card checkbox adds character to selected characters', async () => {
  const mockArray = createMockArrayfFull();
  const infoObj = createInfo();

  render(
    <MemoryRouter>
      <ResultsList results={mockArray} info={infoObj} />
    </MemoryRouter>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  const checkbox = checkboxes[0];
  await userEvent.click(checkbox);
  const selected = useStore.getState().selectedCharacters;

  expect(checkbox).toBeChecked();
  expect(selected).toHaveLength(1);
  expect(selected[0].id).toBe(mockArray[0].id);
});

test('click on character card checkbox removes character from selected characters', async () => {
  const mockArray = createMockArrayfFull();
  const infoObj = createInfo();

  render(
    <MemoryRouter>
      <ResultsList results={mockArray} info={infoObj} />
    </MemoryRouter>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  const checkbox = checkboxes[0];

  // First click: select character
  await userEvent.click(checkbox);

  await waitFor(() => {
    expect(checkbox).toBeChecked();
    expect(useStore.getState().selectedCharacters).toHaveLength(1);
  });

  // Second click: unselect
  await userEvent.click(checkbox);

  await waitFor(() => {
    expect(checkbox).not.toBeChecked();
    expect(useStore.getState().selectedCharacters).toHaveLength(0);
  });
});
