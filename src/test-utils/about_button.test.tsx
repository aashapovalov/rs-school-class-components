import { AboutButton } from '../components';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

test('Crash button mounts successfully', () => {
  render(
    <MemoryRouter>
      <AboutButton />
    </MemoryRouter>
  );

  const button = screen.getByRole('button', { name: 'About author' });
  expect(button).toBeInTheDocument();
});
