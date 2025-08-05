import { create } from 'zustand';

import type { Character } from '@/shared/types';

interface StateStore {
  selectedCharacters: Character[];
  addSelectedCharacter: (character: Character) => void;
  removeSelectedCharacter: (character: Character) => void;
  clearSelectedCharacters: () => void;
}

export const useStore = create<StateStore>((set) => ({
  selectedCharacters: [],
  addSelectedCharacter: (character: Character) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, character],
    })),
  removeSelectedCharacter: (character: Character) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (c) => c.id !== character.id
      ),
    })),
  clearSelectedCharacters: () =>
    set(() => ({
      selectedCharacters: [],
    })),
}));

export const useSelectedCharacterCount = () => {
  const { selectedCharacters } = useStore();
  return selectedCharacters.length;
};
