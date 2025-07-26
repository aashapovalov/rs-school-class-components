import type { ResultsListProps } from './types';
import { PagesList } from './';

import fallbackImg from '../assets/fallback_card_image.png';

export default function ResultsList(props: ResultsListProps) {
  const { characterActive, results } = props;

  return (
    <>
      <section
        className={characterActive ? 'result-section narrow' : 'result-section'}
      >
        {results.map((character, index) => (
          <div
            key={index}
            className={`character-card ${index}`}
            data-testid="character-card"
          >
            <img
              className="character-image"
              src={character.image ? character.image : fallbackImg}
              alt={character.name}
            />
            <div className="character-description">
              <h2 className="character-name">{character.name}</h2>
            </div>
          </div>
        ))}
      </section>
      <PagesList {...props} />
    </>
  );
}
