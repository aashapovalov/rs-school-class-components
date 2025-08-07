import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { NotFoundPage } from '@/pages';

test('renders NotFoundPage on unknown route', () => {
  render(
    <MemoryRouter initialEntries={['/some/unknown-page']}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/doesn’t exist/i)).toBeInTheDocument();
});
