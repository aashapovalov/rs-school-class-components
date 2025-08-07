import { useNavigate, useSearchParams } from 'react-router';
import type { MouseEvent } from 'react';

import type { ResultsListProps } from '@/shared/types';
import { PagesList, SelectModal } from '@/entities/index';
import { useStore } from '@/state/zustand';

import fallbackImg from '../../assets/fallback_card_image.png';

export function ResultsList(props: ResultsListProps) {
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

  function handleContainerClick(e: MouseEvent) {
    if (e.currentTarget === e.target && details) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('details');
      setSearchParams(newParams);
    }
  }

  function handleCardClick(
    e: MouseEvent,
    characterName: string,
    searchPage: string,
    characterDetails: number
  ) {
    if ((e.target as HTMLInputElement).type === 'checkbox') {
      return;
    }
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
              onClick={(e) => handleCardClick(e, name, page, character.id)}
              key={index}
              className={`character-card relative 
  bg-[var(--Card-background)] dark:bg-[var(--Card-background-dark)] 
  border border-solid border-hsl(0, 0%, 20%) dark:border-yellow-600 
  hover:cursor-pointer shadow-[0_4px_6px_rgba(0,0,0,0.5)] 
  ${
    selectedCharacters.some((char) => char.id === character.id)
      ? 'ring-2 ring-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.5)] dark:ring-blue-300 dark:shadow-[0_0_20px_rgba(255,255,0,0.5)]'
      : ''
  }`}
              data-testid="character-card"
            >
              <input
                type="checkbox"
                checked={selectedCharacters.some(
                  (char) => char.id === character.id
                )}
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
