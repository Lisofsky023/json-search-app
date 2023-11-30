import { useState, useEffect } from 'react';

interface SearchState {
  email: string;
  number: string;
}

interface SearchError {
  message: string;
}

interface SearchResultItem {
  email: string;
  number: string;
}

const useSearch = () => {
  const [searchResult, setSearchResult] = useState<SearchResultItem[] | SearchError[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [abortController, setAbortController] = useState(new AbortController());
  const [requestInProgress, setRequestInProgress] = useState<boolean>(false);

  useEffect(() => {
    return () => abortController.abort();
  }, [abortController]);

  const performSearch = async ({ email, number }: SearchState) => {
    if (requestInProgress) {
      abortController.abort();
    }

    setRequestInProgress(true);
    setLoading(true);

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      const response = await fetch('http://localhost:8000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, number }),
        signal: newAbortController.signal,
      });

      if (response.status === 499) {
        console.log('Request was canceled');
        return;
      }

      const result = await response.json();

      if (result && result.result) {
        setSearchResult(result.result);
      } else {
        setSearchResult([{ message: 'Unexpected response format' }]);
      }

    } catch (error) {
      if ((error as { name?: string })?.name === 'AbortError') {
        console.log('Request was canceled');
        return;
      }
      setSearchResult([{ message: 'Error during search' }]);
    } finally {
      if (!newAbortController.signal.aborted) {
        setLoading(false);
      }
      setRequestInProgress(false);
    }
  };

  return { searchResult, loading, performSearch };
};

export default useSearch;
