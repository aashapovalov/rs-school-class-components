import { Spinner } from '../components';

import { screen, render } from '@testing-library/react';

test('spinner mounts successfuly', () => {
  render(<Spinner />);
  const spinner = screen.getByTestId('spinner');
  expect(spinner).toBeInTheDocument();
});

test('spinner provides an aria-label', () => {
  render(<Spinner />);
  const spinnerAriaLabel = screen.getByLabelText('spinner');
  expect(spinnerAriaLabel).toBeInTheDocument();
});
