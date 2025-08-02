import { useStore } from '../index';

import { modalRick, downloadBtn, unselectBtn } from '../../assets';

export default function SelectModal() {
  const selectedCharacters = useStore((state) => state.selectedCharacters);
  const clearSelectedCharacters = useStore(
    (state) => state.clearSelectedCharacters
  );
  return (
    <div className="select-modal fixed bottom-10 left-1/2 -translate-x-1/2 max-w-[64rem] w-full sm:w-[90%] overflow-y-auto z-50 flex flex-col justify-center bg-[var(--Card-background)] dark:bg-[var(--Card-background-dark)] p-6 rounded-2xl shadow-lg border-2 border-solid border-[hsl(195,53%,72%)] outline-2">
      <div className="modal-description flex flex-row justify-center items-center gap-4">
        <img
          src={modalRick}
          alt="Head of Rick Sanchez in the modal window"
          className="w-40 h-40 ml-6"
        />
        <h2 className="text-[2rem] text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)] p-6">
          <i>
            &quot;Dimensional gate is ready. The selected{' '}
            <span>
              <span className="font-bold">
                {selectedCharacters.length}{' '}
                {selectedCharacters.length === 1 ? 'entity' : 'entities'}
              </span>{' '}
              {selectedCharacters.length === 1 ? 'is' : 'are'}
            </span>{' '}
            queued for transfer across space-time. Hope you know what you are
            doing…&quot;
          </i>
        </h2>
      </div>
      <div className="modal-actions flex flex-row justify-center items-center gap-[3.2rem] mt-0">
        <button
          style={{ backgroundImage: `url(${unselectBtn})` }}
          className="unselect-button w-80 h-20 bg-no-repeat bg-center bg-contain cursor-pointer hover:scale-105 hover:brightness-[1.20]"
          onClick={clearSelectedCharacters}
          aria-label="Unselect Characters"
        />
        <button
          style={{ backgroundImage: `url(${downloadBtn})` }}
          className="download-button w-80 h-20 bg-no-repeat bg-center bg-contain cursor-pointer hover:scale-105 hover:brightness-[1.20]"
          aria-label="Download Characters"
        />
      </div>
    </div>
  );
}
