import { Component } from 'react';

import type { CrashState } from './types';

export default class CrashButton extends Component<
  Record<string, never>,
  CrashState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { crashNow: false };
    this.releaseCrash = this.releaseCrash.bind(this);
  }

  releaseCrash() {
    this.setState({ crashNow: true });
  }

  render() {
    if (this.state.crashNow) {
      throw new Error('Oh no!!! Someone pushed the Crash button!!');
    }
    return (
      <button
        className="crash-btn"
        onClick={this.releaseCrash}
        aria-label="Crash App"
      />
    );
  }
}
