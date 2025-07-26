import { useSearchParams } from 'react-router';

import {
  ResultsList,
  useFetchApiList,
  useFetchApiCharacter,
  CharacterDetails,
} from './';

export default function SearchRequst() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details') || '';

  const urlBase: string = 'https://rickandmortyapi.com/api/character';
  const urlList: string = `${urlBase}/?name=${encodeURIComponent(name)}&page=${page}`;
  const urlCharacter = details ? `${urlBase}/${details}` : '';
  const dataList = useFetchApiList(urlList);
  const dataCharacter = useFetchApiCharacter(urlCharacter);

  if (dataList && dataCharacter) {
    return (
      <>
        <ResultsList
          info={dataList?.info}
          results={dataList?.results}
          characterActive={details}
        />
        {details && dataCharacter && (
          <CharacterDetails character={dataCharacter} />
        )}{' '}
      </>
    );
  } else if (dataList) {
    return (
      <ResultsList
        info={dataList?.info}
        results={dataList?.results}
        characterActive={''}
      />
    );
  }

  return null;
}
