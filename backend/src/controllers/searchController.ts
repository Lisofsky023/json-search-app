import { Request, Response } from 'express';
import { jsonSearch, SearchResult } from '../services/searchService';
import Joi from 'joi';

interface SearchRequest {
  email: string;
  number: string;
}

interface SearchResponse {
  error?: string;
  result?: SearchResult | undefined;
}

// Used for canceling the previous search request
let currentRequestTimeout: NodeJS.Timeout | null = null;

// Schema for request validation using Joi
const searchRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  number: Joi.string().pattern(new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{2}$')).allow(''),
});

export const startSearch = async (req: Request<{}, {}, SearchRequest>, res: Response<SearchResponse>) => {

  const { error } = searchRequestSchema.validate(req.body);
  if (error) {
    console.log('Validation error:', error.details);
    return res.status(400).json({ error: error.details[0].message });
  }
  // Cancel the previous timeout if it exists
  if (currentRequestTimeout) {
    clearTimeout(currentRequestTimeout);
    currentRequestTimeout = null;
  }
  // Set a new timeout for simulating delayed response
  currentRequestTimeout = setTimeout(async () => {
    try {
      const { email, number } = req.body;
      const result = await jsonSearch(email, number);
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
