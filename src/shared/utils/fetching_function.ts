export async function fetchingFunction(url: string) {
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}
