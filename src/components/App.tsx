import React, { useState, useEffect, useCallback } from 'react';
import InputAuto from './InputAuto';
import useNobelPrizes from '../hooks/useNobelPrizes';
import { fuzzyMatch, handleSearch } from '../utils/utils';
import '../styles/App.css';

const App: React.FC = () => {
  // State variables for search inputs
  const [searchName, setSearchName] = useState<string>('');
  const [searchMotivation, setSearchMotivation] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('');
  const [searchYear, setSearchYear] = useState<string>('');

  // Custom hook for fetching and managing Nobel Prize data
  const { data, results, setResults, currentPage, setCurrentPage, resultsPerPage } = useNobelPrizes();

  // Function to perform the search based on input values
  const search = useCallback(() => {
    const filteredResults = handleSearch(data, searchName, searchMotivation, searchCategory, searchYear, fuzzyMatch);
    setResults(filteredResults); // Update results state with filtered data
    setCurrentPage(1); // Reset to first page on new search
  }, [data, searchName, searchMotivation, searchCategory, searchYear, setResults, setCurrentPage]);

  // useEffect to trigger search whenever input values change
  useEffect(() => {
    search();
  }, [search]);

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Function to go to the next page
  const nextPage = () => {
    if (indexOfLastResult < results.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Nobel Prize Search</h1>
      <div className="input-container">
        {/* Search input fields */}
        <InputAuto
          pholder="Search by name..."
          data={Array.from(new Set(data.map(item => `${item.firstname} ${item.surname}`)))}
          onSelected={setSearchName}
          onChange={setSearchName}
        />
        <InputAuto
          pholder="Search by motivation..."
          data={Array.from(new Set(data.map(item => item.motivation)))}
          onSelected={setSearchMotivation}
          onChange={setSearchMotivation}
        />
        <InputAuto
          pholder="Search by category..."
          data={Array.from(new Set(data.map(item => item.category)))}
          onSelected={setSearchCategory}
          onChange={setSearchCategory}
        />
        <InputAuto
          pholder="Search by year..."
          data={Array.from(new Set(data.map(item => item.year)))}
          onSelected={setSearchYear}
          onChange={setSearchYear}
        />
      </div>
      <div className="table-container">
        {/* Pagination buttons */}
        <div className="pagination-buttons">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={nextPage} disabled={indexOfLastResult >= results.length}>Next</button>
        </div>
        {/* Results table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Year</th>
              <th>Motivation</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map((result, index) => (
              <tr key={index}>
                <td>{result.firstname} {result.surname}</td>
                <td>{result.category}</td>
                <td>{result.year}</td>
                <td>{result.motivation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
