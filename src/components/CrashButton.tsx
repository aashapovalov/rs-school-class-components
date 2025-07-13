import * as React from 'react';
import crashBtnImg from '../assets/crash_button.png';

interface State {
  crashNow: boolean;
}

export default class CrashButton extends React.Component<{}, State>{
    
constructor(props: {}) {
  super(props);
  this.state = {crashNow: false};
  this.releaseCrash = this.releaseCrash.bind(this);
}

releaseCrash() {
    this.setState({crashNow: true})
}

render() {
   if (this.state.crashNow) {
    throw new Error ('Oh no!!! Someone pushed the Crash button!!');

   }
    return (
        <button
        className="crash-btn"
        onClick={this.releaseCrash}
        aria-label="Crash App"
      />
    )
}
}