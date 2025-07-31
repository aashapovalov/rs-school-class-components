import { CrashButton } from '../components';

import { fireEvent, render, screen } from '@testing-library/react';

test('Crash button mounts successfully', () => {
  render(<CrashButton />);

  const button = screen.getByRole('button', { name: 'Crash App' });
  expect(button).toBeInTheDocument();
});

test('throws error when clicked', () => {
  render(<CrashButton />);

  const button = screen.getByRole('button', { name: 'Crash App' });

  expect(() => {
    fireEvent.click(button);
  }).toThrow();
});
