import { useSearchParams } from 'react-router';

import { ResultsList, useFetchApiList } from './';

export default function SearchRequst() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';

  const urlBase: string = 'https://rickandmortyapi.com/api/character';
  const urlName: string = `${urlBase}/?name=${encodeURIComponent(name)}&page=${page}`;
  const data = useFetchApiList(urlName);

  if (data) {
    return <ResultsList info={data?.info} results={data?.results} />;
  }

  return null;
}
