import noResultsImg from '../assets/no_results_error.png';

export function ErrorMessage({ message }: { message: string }) {
  const isNotFound = message.toLowerCase().includes('there is nothing here');

  return (
    <div className="error-message">
      {isNotFound ? (
        <img
          src={noResultsImg}
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
