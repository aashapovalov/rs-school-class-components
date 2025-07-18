import { Component } from 'react';

export default class Spinner extends Component {
  render() {
    return (
      <div className="spinner-overlay" data-testid="spin-overlay">
        <div className="spinner" data-testid="spinner" aria-label="spinner" />
      </div>
    );
  }
}
