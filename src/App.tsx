import React from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import useSearch from './hook/useSearch';
import ErrorBoundary from './error/ErrorBoundary';
import './App.css';

const App: React.FC = () => {
  const { searchResult, loading, performSearch } = useSearch();

  return (
    <ErrorBoundary>
      <div className="App">
        <SearchForm onSubmit={performSearch} />

        {loading && <p>Loading...</p>}

        {searchResult && <SearchResults results={searchResult} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
