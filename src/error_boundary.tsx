import type { ErrorInfo } from 'react';
import { Component } from 'react';

import { ErrorMessage } from '@/entities';
import type { ErrorBoundaryState, ErrorBoundaryProps } from '@/shared/types';

import { genErrorRickImg } from '@/assets';

export class ErrorBoundary extends Component<
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
