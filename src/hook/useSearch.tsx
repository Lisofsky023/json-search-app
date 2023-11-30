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
  
  // Function to perform the search
  const performSearch = async ({ email, number }: SearchState) => {
    // Cancel ongoing request if there is one
    if (requestInProgress) {
      abortController.abort();
    }

    setRequestInProgress(true);
    setLoading(true);

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      // Making the API request
      const response = await fetch('http://localhost:8000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, number }),
        signal: newAbortController.signal,
      });

      // Handling request cancellation
      if (response.status === 499) {
        console.log('Request was canceled');
        return;
      }

      // Processing the response
      const result = await response.json();
      // Setting the search result or error
      if (result && result.result) {
        setSearchResult(result.result);
      } else {
        setSearchResult([{ message: 'Unexpected response format' }]);
      }

    } catch (error) {
      // Handling fetch errors
      if ((error as { name?: string })?.name === 'AbortError') {
        console.log('Request was canceled');
        return;
      }
      setSearchResult([{ message: 'Error during search' }]);
    } finally {
      // Final state updates after request completion or failure
      if (!newAbortController.signal.aborted) {
        setLoading(false);
      }
      setRequestInProgress(false);
    }
  };

  return { searchResult, loading, performSearch };
};

export default useSearch;
