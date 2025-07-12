import { Component } from 'react';

interface Props {
  message: string;
}

export default class ErrorMessage extends Component<Props> {
  render() {
    const { message } = this.props;
    const isNotFound = message.toLowerCase().includes('there is nothing here');

    return (
      <div className="error-message">
        {isNotFound ? (
          <p className="no-results">No characters found. Try a different name.</p>
        ) : (
          <p className="general-error">{message}</p>
        )}
      </div>
    );
  }
}