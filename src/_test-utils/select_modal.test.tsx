import { render, screen } from '@testing-library/react';
import { SelectModal } from '../components';
import { mockSelectedCharactersTwo, mockSelectedCharactersOne } from './mocks';
import { useStore } from '../components/state/state_store';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  useStore.setState({ selectedCharacters: [] });
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
