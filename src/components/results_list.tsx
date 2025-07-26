import { useNavigate, useSearchParams } from 'react-router';

import type { ResultsListProps } from './types';
import { PagesList } from './';

import fallbackImg from '../assets/fallback_card_image.png';

export default function ResultsList(props: ResultsListProps) {
  const { characterActive, results } = props;
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';
  const navigate = useNavigate();

  function handleCardClick(
    characterName: string,
    searchPage: string,
    characterDetails: number
  ) {
    navigate(
      `/search?name=${characterName}&page=${searchPage}&details=${characterDetails}`
    );
  }

  return (
    <>
      <div
        className={
          characterActive
            ? 'results-list-section narrow'
            : 'results-list-section '
        }
      >
        <div className="character-list">
          {results.map((character, index) => (
            <div
              onClick={() => handleCardClick(name, page, character.id)}
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
          <PagesList {...props} />
        </div>
      </div>
    </>
  );
}
