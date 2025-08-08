import { getPaginationArray } from '@/shared/utils';

test('getPaginationArray returns correct array for 1 page', () => {
  const result = getPaginationArray(1, 1);
  expect(result).toEqual(null);
});

test('getPaginationArray returns correct array for 5 pages', () => {
  const result = getPaginationArray(1, 5);
  expect(result).toEqual([1, 2, 3, 4, 5]);
});

test('getPaginationArray returns correct array for 10 pages with current page in the middle', () => {
  const result = getPaginationArray(5, 10);
  expect(result).toEqual([1, '...', 4, 5, 6, '...', 10]);
});

test('getPaginationArray returns correct array for 6 pages with current page at the start', () => {
  const result = getPaginationArray(1, 6);
  expect(result).toEqual([1, 2, 3, '...', 6]);
});

test('getPaginationArray returns correct array for 6 pages with current page at the end', () => {
  const result = getPaginationArray(5, 6);
  expect(result).toEqual([1, '...', 4, 5, 6]);
});
