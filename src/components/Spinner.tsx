import { Component } from 'react';

export default class Spinner extends Component {
  render() {
    return (
      <div className="spinner-overlay">
        <div className="spinner" />
      </div>
    );
  }
}
