import * as React from 'react';

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
    state: State = { 
        hasError: false, 
        error: null
    } 


  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error };
  }

   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
  return (
        <>
        <div className='error-container'>
            <p className='error-name'>Error: {this.state.error?.name}</p>
            <p className='error-message'>{this.state.error?.message ?? 'Something went wrong'}</p>
        </div>
        </>
    )
  }
    return this.props.children;

}
}