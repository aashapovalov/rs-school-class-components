import { CrashButton } from '../components';

import { render, screen } from '@testing-library/react';

test('Crash button mounts successfully', () => {
  render(<CrashButton />);

  const button = screen.getByRole('button', { name: 'Crash App' });
  expect(button).toBeInTheDocument();
});
