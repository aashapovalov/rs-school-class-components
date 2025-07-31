import { useNavigate, useSearchParams } from 'react-router';

import type { ResultsListProps } from '../../types/types';

export default function PagesList(props: ResultsListProps) {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const navigate = useNavigate();

  function goToPage(pageNum: number) {
    console.log(pageButtons);
    navigate(`/search?name=${encodeURIComponent(name)}&page=${pageNum}`);
  }

  const currentPage = Number(searchParams.get('page') || '1');
  console.log('currentPage type:', typeof currentPage, currentPage);
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
      <div className={'pagination-container'}>
        <nav className={'pagination text-15xl'} aria-label="Pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className={currentPage === 1 ? undefined : 'active'}
          >
            Previous
          </button>

          {pageButtons.map((p, idx) => {
            return typeof p === 'number' ? (
              <button
                key={`page-${p}`}
                disabled={p === currentPage}
                className={
                  p === currentPage
                    ? 'current font-bold text-[color:var(--Font-color-monitor-inactive)]'
                    : 'active'
                }
                onClick={() => goToPage(p)}
                aria-current={p === currentPage ? 'page' : undefined}
              >
                {p}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="ellipsis">
                {p}
              </span>
            );
          })}

          <button
            disabled={currentPage === pagesCount}
            onClick={() => goToPage(currentPage + 1)}
            className={currentPage === pagesCount ? undefined : 'active'}
          >
            Next
          </button>
        </nav>
      </div>
    </>
  );
}
