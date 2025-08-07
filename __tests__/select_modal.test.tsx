import { render, screen } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

import { SelectModal } from '@/entities';
import {
  mockSelectedCharactersTwo,
  mockSelectedCharactersOne,
} from '@/shared/__test-setup/mocks';
import { useStore } from '@/state/zustand';

afterEach(() => {
  useStore.setState({ selectedCharacters: [] });
});

let originalCreateObjectURL: typeof URL.createObjectURL;

beforeAll(() => {
  originalCreateObjectURL = URL.createObjectURL;
  URL.createObjectURL = vi.fn(() => 'blob:mock-url');
});

afterAll(() => {
  URL.createObjectURL = originalCreateObjectURL;
});

test('renders SelectModal correctly', () => {
  render(<SelectModal />);
  const DownloadBtn = screen.getByRole('button', { name: /download/i });
  const UnselectBtn = screen.getByRole('button', { name: /unselect/i });
  const modalDescription = screen.getByText(/dimensional gate is ready/i);
  const rickImage = screen.getByAltText(/head of rick sanchez/i);

  expect(DownloadBtn).toBeInTheDocument();
  expect(UnselectBtn).toBeInTheDocument();
  expect(modalDescription).toBeInTheDocument();
  expect(rickImage).toBeInTheDocument();
});

test('renders SelectModal with correct 2 character count', () => {
  act(() => {
    useStore.setState({
      selectedCharacters: mockSelectedCharactersTwo,
    });
  });

  render(<SelectModal />);
  screen.debug();

  expect(screen.getByText(/2 entities/)).toBeInTheDocument();
});

test('renders SelectModal with correct 1 character count', () => {
  act(() => {
    useStore.setState({
      selectedCharacters: mockSelectedCharactersOne,
    });
  });

  render(<SelectModal />);
  screen.debug();

  expect(screen.getByText(/1 entity/)).toBeInTheDocument();
});

test('clears state on unselect button click', async () => {
  act(() => {
    useStore.setState({
      selectedCharacters: mockSelectedCharactersTwo,
    });
  });

  render(<SelectModal />);

  const UnselectBtn = screen.getByRole('button', { name: /unselect/i });

  await userEvent.click(UnselectBtn);

  expect(useStore.getState().selectedCharacters).toEqual([]);
});

test('calls DownloadArray with selected characters on download button click', async () => {
  const spy = vi
    .spyOn(global.URL, 'createObjectURL')
    .mockReturnValue('blob:mock-url');

  const clickMock = vi.fn();

  vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
    const element = document.createElementNS(
      'http://www.w3.org/1999/xhtml',
      tagName
    );
    if (tagName === 'a') {
      element.click = clickMock;
    }
    return element;
  });

  act(() => {
    useStore.setState({ selectedCharacters: mockSelectedCharactersTwo });
  });

  render(<SelectModal />);

  const downloadBtn = screen.getByRole('button', { name: /download/i });
  await userEvent.click(downloadBtn);

  expect(spy).toHaveBeenCalled(); // confirm CSV blob was created
  expect(clickMock).toHaveBeenCalled(); // confirm download link was clicked
});
