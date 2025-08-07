export function Spinner() {
  return (
    <div className="spinner-overlay" data-testid="spin-overlay">
      <div className="spinner" data-testid="spinner" aria-label="spinner" />
    </div>
  );
}
