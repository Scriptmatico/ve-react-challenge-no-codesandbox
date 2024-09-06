import { renderHook, act } from '@testing-library/react-hooks';
import useFetchCharacters from './useFetchCharacters';

describe('useFetchCharacters Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch characters and update state correctly', async () => {
    const mockResponse = {
      info: { next: null, prev: null },
      results: [
        { id: 1, name: 'Rick Sanchez', species: 'Human', gender: 'Male', status: 'Alive', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as jest.Mock;

    const { result } = renderHook(() => useFetchCharacters('https://rickandmortyapi.com/api/character'));

    await act(async () => {
      result.current.handleNextPage();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.characters).toEqual(mockResponse.results);
    expect(result.current.nextPageUrl).toBe(null);
    expect(result.current.prevPageUrl).toBe(null);
  });

  it('should set loading state correctly during fetch', async () => {
    const mockResponse = {
      info: { next: null, prev: null },
      results: [],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as jest.Mock;

    const { result } = renderHook(() => useFetchCharacters('https://rickandmortyapi.com/api/character'));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      result.current.handleNextPage();
    });

    expect(result.current.loading).toBe(false);
  });
});
