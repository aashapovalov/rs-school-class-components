import type { Character } from '../../types/types';

import fallbackImg from '../../assets/fallback_card_image.png';

export default function CharacterDetails({
  character,
}: {
  character: Character | null;
}) {
  return (
    <section className={'character-details'}>
      <div
        className="character-details-card bg-[var(--Card-background)] dark:bg-[var(--Card-background-dark)] shadow-[0_4px_6px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_6px_yellow-200] border border-solid border-hsl(0, 0%, 20%) dark:border-yellow-600"
        data-testid="character-details-card"
      >
        <img
          className="character-details-image"
          src={character?.image ? character.image : fallbackImg}
          alt={`${character?.name} character image`}
        />
        <div className="character-details-description">
          <h2 className="character-details-name text-[var(--Font-color-error)] dark:text-[var(--Font-color-error-dark)]">
            {character?.name}
          </h2>
          <p className="alive-status">
            <span
              className={`status-indicator ${
                character?.status === 'Alive'
                  ? 'green'
                  : character?.status === 'Dead'
                    ? 'red'
                    : 'gray'
              }`}
            ></span>
            {character?.status} -
            <span className="species"> {character?.species}</span>
          </p>
          <p className="origination text-[var(--Font-color-secondary)] dark:text-[var(--Font-color-secondary-dark)]">
            Originally from:{' '}
            <span className="text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)]">
              {character?.origin.name}
            </span>
          </p>
          <p className="location text-[var(--Font-color-secondary)] dark:text-[var(--Font-color-secondary-dark)]">
            Last known location:{' '}
            <span className="text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)]">
              {character?.location.name}
            </span>
          </p>
          <p className="episodes">
            Appears in {character?.episode?.length ?? 0} episodes
          </p>
        </div>
      </div>
    </section>
  );
}
