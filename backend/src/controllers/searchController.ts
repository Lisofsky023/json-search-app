import { Request, Response } from 'express';
import { jsonSearch, SearchResult } from '../services/searchService';

interface SearchRequest {
  email: string;
  number: string;
}

interface SearchResponse {
  error?: string;
  result?: SearchResult | undefined;
}

let currentRequestTimeout: NodeJS.Timeout | null = null;

export const startSearch = async (req: Request<{}, {}, SearchRequest>, res: Response<SearchResponse>) => {
  if (currentRequestTimeout) {
    clearTimeout(currentRequestTimeout);
    currentRequestTimeout = null;
  }

  currentRequestTimeout = setTimeout(async () => {
    try {
      const { email, number } = req.body;
      console.log('Server received search request:', { email, number });

      const result = await jsonSearch(email, number);
      console.log('Server search result:', result);

      res.json({ result });
    } catch (error: unknown) {
      handleError(error, res);
    }
  }, 5000);
};

function handleError(error: unknown, res: Response<SearchResponse>) {
  if (error instanceof Error && error.message === 'Request canceled') {
    console.log('Request was canceled');
  } else {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
