import React from 'react';

interface SearchResultItem {
  email: string;
  number: string;
}

interface SearchError {
  message: string;
}

interface SearchResultData {
  result: SearchResultItem[];
}

interface SearchResultsProps {
  results: SearchResultItem[] | SearchError[] | SearchResultData;
  loading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  const resultData = Array.isArray(results)
    ? results
    : 'result' in results
    ? results.result
    : [];

  if (!resultData || resultData.length === 0 || ('message' in resultData[0] && resultData[0].message === 'No results found')) {
    return <p>No results found</p>;
  }

  if ('message' in resultData[0] && resultData[0].message === 'Error during search') {
    return <p>Error during search</p>;
  }

  return (
    <div>
      <h2>Search Result:</h2>
      <ul>
        {resultData.map((item, index) => (
          <li key={index}>
            {('email' in item && 'number' in item) ? (
              <>
                <p>Email: {item.email}</p>
                <p>Number: {item.number}</p>
              </>
            ) : (
              <p>{item.message}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
