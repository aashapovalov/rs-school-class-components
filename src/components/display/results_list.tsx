import { useNavigate, useSearchParams } from 'react-router';

import type { ResultsListProps } from '../../types/types';
import { PagesList, SelectModal, useStore } from '../';

import fallbackImg from '../../assets/fallback_card_image.png';

export default function ResultsList(props: ResultsListProps) {
  const { results } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details') || '';
  const navigate = useNavigate();
  const selectedCharacters = useStore((state) => state.selectedCharacters);
  const addSelectedCharacter = useStore((state) => state.addSelectedCharacter);
  const removeSelectedCharacter = useStore(
    (state) => state.removeSelectedCharacter
  );
  console.log('SELECTED CHARACTERS:', selectedCharacters.length);

  function handleContainerClick(e: React.MouseEvent) {
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
      <div className={'results-list-section'}>
        <div className="character-list" onClick={handleContainerClick}>
          {results.map((character, index) => (
            <div
              onClick={() => handleCardClick(name, page, character.id)}
              key={index}
              className={
                'character-card relative bg-[var(--Card-background)] dark:bg-[var(--Card-background-dark)] shadow-[0_4px_6px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_6px_yellow-200] border border-solid border-hsl(0, 0%, 20%) dark:border-yellow-600'
              }
              data-testid="character-card"
            >
              <input
                type="checkbox"
                className="character-checkbox absolute top-[5%] right-[7%] scale-[1.5] cursor-pointer"
                onChange={(e) =>
                  e.target.checked === true
                    ? addSelectedCharacter(character)
                    : removeSelectedCharacter(character)
                }
              />
              <img
                className="character-image"
                src={character.image ? character.image : fallbackImg}
                alt={character.name}
              />
              <div className="character-description">
                <h2 className="character-name text-[var(--Font-color-basic)] dark:text-[var(--Font-color-basic-dark)]">
                  {character.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
        {selectedCharacters.length > 0 && <SelectModal />}
        <PagesList {...props} />
      </div>
    </>
  );
}
