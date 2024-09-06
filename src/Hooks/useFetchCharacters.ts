import { useState, useEffect } from "react";

import { ApiResponseModel, CharacterModel } from "../Models";

const useFetchCharacters = (initialUrl: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>(initialUrl);

  const fetchCharacters = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data: ApiResponseModel = await response.json();

      setCharacters(data.results);
      setNextPageUrl(data.info.next);
      setPrevPageUrl(data.info.prev);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentUrl);
  }, [currentUrl]);

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentUrl(nextPageUrl);
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl) {
      setCurrentUrl(prevPageUrl);
    }
  };

  return {
    loading,
    characters,
    handleNextPage,
    handlePrevPage,
    nextPageUrl,
    prevPageUrl,
  };
};

export default useFetchCharacters;
