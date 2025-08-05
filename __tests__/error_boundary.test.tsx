import { screen, render } from '@testing-library/react';
import { ErrorBoundary } from '../src';

test('Catches and handles JavaScript errors in child components', () => {
  const NaugthyChild = () => {
    throw new Error('I`m naughty, naughty child');
  };

  const logErrorInConsole = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <NaugthyChild />
    </ErrorBoundary>
  );

  const errorMsg = screen.getByText('I`m naughty, naughty child');

  expect(errorMsg).toBeInTheDocument();
  expect(logErrorInConsole).toBeCalled();

  logErrorInConsole.mockRestore();
});
