import { useSearchParams } from 'react-router';

import { ResultsList, CharacterDetails } from '@/entities';
import { useFetchApiList, useFetchApiCharacter } from '@/shared/hooks';

export function SearchRequest() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details') || '';

  const urlBase: string = 'https://rickandmortyapi.com/api/character';
  const urlList: string = `${urlBase}/?name=${encodeURIComponent(name)}&page=${page}`;
  const urlCharacter = details ? `${urlBase}/${details}` : '';
  const dataList = useFetchApiList(urlList);
  const { searchResults } = useFetchApiCharacter(urlCharacter);

  if (dataList && searchResults) {
    return (
      <>
        <ResultsList info={dataList?.info} results={dataList?.results} />
        {details && searchResults && (
          <CharacterDetails character={searchResults} />
        )}
      </>
    );
  } else if (dataList) {
    return <ResultsList info={dataList?.info} results={dataList?.results} />;
  }

  return null;
}
