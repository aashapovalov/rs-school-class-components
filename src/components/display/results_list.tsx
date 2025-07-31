import { useNavigate, useSearchParams } from 'react-router';

import type { ResultsListProps } from '../../types/types';
import { PagesList } from '../';

import fallbackImg from '../../assets/fallback_card_image.png';

export default function ResultsList(props: ResultsListProps) {
  const { results } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details') || '';
  const navigate = useNavigate();

  function handleContainerClick(e: React.MouseEvent) {
    console.log(e);
    if (e.currentTarget === e.target && details) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('details');
      setSearchParams(newParams);
    }
  }

  function handleCardClick(
    characterName: string,
    searchPage: string,
    characterDetails: number
  ) {
    navigate(
      `/?name=${characterName}&page=${searchPage}&details=${characterDetails}`
    );
  }

  return (
    <>
      <div className={'results-list-section '}>
        <div className="character-list" onClick={handleContainerClick}>
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
        </div>
        <PagesList {...props} />
      </div>
    </>
  );
}
