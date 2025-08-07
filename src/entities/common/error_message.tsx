import { noResultsError } from '@/assets';

export function ErrorMessage({ message }: { message: string }) {
  const isNotFound = message.toLowerCase().includes('there is nothing here');

  return (
    <div className="error-message">
      {isNotFound ? (
        <img
          src={noResultsError}
          alt="No Results Error"
          className="no-results-error"
        />
      ) : (
        <p className="general-error">
          Error: <span>{message}</span>
        </p>
      )}
    </div>
  );
}
