import { useNavigate, useSearchParams } from 'react-router';

import type { ResultsListProps } from '@/shared/types';
import { getPaginationArray } from '@/shared/utils';

export function PagesList(props: ResultsListProps) {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const navigate = useNavigate();

  function goToPage(pageNum: number) {
    navigate(`/?name=${encodeURIComponent(name)}&page=${pageNum}`);
  }

  const currentPage = Number(searchParams.get('page') || '1');
  const { info } = props;
  const pagesCount = info.pages;

  const pageButtons = getPaginationArray(currentPage, pagesCount);
  console.log('Page buttons:', pageButtons);
  if (!pageButtons) {
    return null;
  }

  return (
    <>
      <div className={'pagination-container'}>
        <nav className={'pagination text-15xl'} aria-label="Pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className={
              currentPage === 1
                ? undefined
                : 'active text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)]'
            }
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
                    ? 'current font-bold text-[color:var(--Font-color-monitor-inactive)] dark:text-[var(--Font-color-secondary-dark)]'
                    : 'active text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)]'
                }
                onClick={() => goToPage(p)}
                aria-current={p === currentPage ? 'page' : undefined}
              >
                {p}
              </button>
            ) : (
              <span
                key={`ellipsis-${idx}`}
                className="ellipsis text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)]"
              >
                {p}
              </span>
            );
          })}

          <button
            disabled={currentPage === pagesCount}
            onClick={() => goToPage(currentPage + 1)}
            className={
              currentPage === pagesCount
                ? undefined
                : 'active text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)]'
            }
          >
            Next
          </button>
        </nav>
      </div>
    </>
  );
}
