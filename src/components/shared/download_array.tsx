import type { Character } from '../../types/types';

export default function DownloadArray(characters: Character[]) {
  const flatObjArray = characters.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    type: character.type,
    gender: character.gender,
    origin_name: character.origin.name,
    origin_url: character.origin.url,
    location_name: character.location.name,
    location_url: character.location.url,
    image: character.image,
    episode: character.episode,
    url: character.url,
    created: character.created,
  }));
  const csvHeader = Object.keys(flatObjArray[0]).join(',');
  const stringifiedArray = flatObjArray
    .map((obj) => Object.values(obj).join(','))
    .join('\n');
  const csvContent = `${csvHeader}\n${stringifiedArray}`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${characters.length}_characters.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
