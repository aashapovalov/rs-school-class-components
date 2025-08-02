import { useStore } from '../index';

export default function SelectModal() {
  const clearSelectedCharacters = useStore(
    (state) => state.clearSelectedCharacters
  );
  return (
    <div className="select-modal">
      <h2>
        Dimensional gate is ready. The selected entities are queued for transfer
        across space-time. Hope you know what you are doing…
      </h2>
      <button
        className="unselect-button cursor-pointer"
        onClick={clearSelectedCharacters}
      >
        Undo the Madness
      </button>
      <button className="download-button">Extract Specimens</button>
    </div>
  );
}
