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
        className={`character-details-card ${character?.id}`}
        data-testid="character-details-card"
      >
        <img
          className="character-details-image"
          src={character?.image ? character.image : fallbackImg}
          alt={`${character?.name} character image`}
        />
        <div className="character-details-description">
          <h2 className="character-details-name">{character?.name}</h2>
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
          <p className="origination">
            Originally from: <span>{character?.origin.name}</span>
          </p>
          <p className="location">
            Last known location: <span>{character?.location.name}</span>
          </p>
          <p className="episodes">
            Appears in {character?.episode?.length ?? 0} episodes
          </p>
        </div>
      </div>
    </section>
  );
}
