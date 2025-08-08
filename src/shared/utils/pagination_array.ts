export function getPaginationArray(currentPage: number, pagesCount: number) {
  let pageButtons: (number | string)[] = [];

  // If there are less than 2 pages, return null
  if (pagesCount < 2) {
    return null;
  }

  // If there are 2-5 pages, return all page numbers
  if (pagesCount <= 5 && pagesCount >= 2) {
    for (let i = 1; i <= pagesCount; i++) {
      pageButtons.push(i);
    }
    return pageButtons;
  }

  // If there are more than 5 pages, return a more complex pagination
  if (currentPage < 3 && pagesCount > 5) {
    pageButtons = [1, 2, 3, '...', pagesCount];
    return pageButtons;
  }

  if (currentPage >= pagesCount - 1) {
    pageButtons = [1, '...', pagesCount - 2, pagesCount - 1, pagesCount];
    return pageButtons;
  }

  if (currentPage >= 3 && currentPage < pagesCount - 1 && pagesCount > 5) {
    pageButtons = [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      pagesCount,
    ];
    return pageButtons;
  }
}
