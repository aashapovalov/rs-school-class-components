import * as React from 'react';
import ErrorMessage from './components/ErrorMessage';
import genErrorRickImg from './assets/general_error_rick.png';

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="error-block">
            <ErrorMessage
              message={this.state.error?.message || 'Something went wrong'}
            />
            <img
              src={genErrorRickImg}
              alt="Rick sarcastic"
              className="general-error-rick"
            />
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
