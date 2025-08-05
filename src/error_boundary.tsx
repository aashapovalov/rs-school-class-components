import { Component } from 'react';
import { ErrorMessage } from './svalka';

import type {
  ErrorBoundaryState,
  ErrorBoundaryProps,
} from './shared/types/types';

import genErrorRickImg from './assets/general_error_rick.png';

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
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
