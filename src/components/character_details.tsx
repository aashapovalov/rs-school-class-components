import type { Character } from './types';

import fallbackImg from '../assets/fallback_card_image.png';

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
          className="character-details_image"
          src={character?.image ? character.image : fallbackImg}
          alt={`${character?.name} character image`}
        />
        <div className="character-details_description">
          <h2 className="character-details-name">{character?.name}</h2>
        </div>
      </div>
    </section>
  );
}
