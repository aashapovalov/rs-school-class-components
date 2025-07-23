import { useState } from 'react';

export default function CrashButton() {
  const [crashNow, setCrashNow] = useState(false);

  function clickHandle() {
    setCrashNow(true);
  }

  if (crashNow) {
    throw new Error('Oh no!!! Someone pushed the Crash button!!');
  }
  return (
    <button
      className="crash-btn"
      onClick={clickHandle}
      aria-label="Crash App"
    />
  );
}
