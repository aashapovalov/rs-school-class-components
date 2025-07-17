import { Spinner } from '../components';

import { screen, render } from '@testing-library/react';

test('spinner mounts successfuly', () => {
  render(<Spinner />);
  const spinner = screen.getByTestId('spinner');
  expect(spinner).toBeInTheDocument();
});
