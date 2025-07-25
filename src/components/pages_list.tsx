import { useNavigate, useSearchParams } from 'react-router';

import type { ResultsListProps } from './types';

export default function PagesList(props: ResultsListProps) {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const navigate = useNavigate();

  function goToPage(pageNum: number) {
    navigate(`/search?name=${encodeURIComponent(name)}&page=${pageNum}`);
  }

  const currentPage = parseInt(searchParams.get('page') || '1');
  const { info } = props;
  const pagesCount = info.pages;

  let pageButtons: (number | string)[] = [];
  if (pagesCount < 2) {
    return null;
  } else if (pagesCount <= 5 && pagesCount >= 2) {
    for (let i = 1; i <= pagesCount; i++) {
      pageButtons.push(i);
    }
  } else {
    if (currentPage < 3) {
      pageButtons = [1, 2, 3, '...', pagesCount];
    } else if (currentPage >= pagesCount - 2) {
      pageButtons = [1, '...', pagesCount - 2, pagesCount - 1, pagesCount];
    } else {
      pageButtons = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        pagesCount,
      ];
    }
  }

  return (
    <>
      <nav className={'pages-list'} aria-label="Pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>

        {pageButtons.map((p, idx) =>
          typeof p === 'number' ? (
            <button
              key={p}
              disabled={p === currentPage}
              className={p === currentPage ? 'active' : ''}
              onClick={() => goToPage(p)}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className="ellipsis">
              {p}
            </span>
          )
        )}

        <button
          disabled={currentPage === pagesCount}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </nav>
    </>
  );
}
