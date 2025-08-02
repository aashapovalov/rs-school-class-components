import { AboutButton, ThemeProvider } from '../components';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

test('Crash button mounts successfully', () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <AboutButton />
      </MemoryRouter>
    </ThemeProvider>
  );

  const button = screen.getByRole('button', { name: 'About author' });
  expect(button).toBeInTheDocument();
});
