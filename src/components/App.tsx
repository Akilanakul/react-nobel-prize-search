import React, { useState, useEffect, useCallback } from 'react';
import InputAuto from './InputAuto';
import useNobelPrizes from '../hooks/useNobelPrizes';
import { fuzzyMatch, handleSearch } from '../utils/utils';
import '../styles/App.css';

const App: React.FC = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [searchMotivation, setSearchMotivation] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('');
  const [searchYear, setSearchYear] = useState<string>('');
  const { data, results, setResults, currentPage, setCurrentPage, resultsPerPage } = useNobelPrizes();

  const search = useCallback(() => {
    const filteredResults = handleSearch(data, searchName, searchMotivation, searchCategory, searchYear, fuzzyMatch);
    setResults(filteredResults);
    setCurrentPage(1); // Reset to first page on new search
  }, [data, searchName, searchMotivation, searchCategory, searchYear, setResults, setCurrentPage]);

  useEffect(() => {
    search();
  }, [search]);

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const nextPage = () => {
    if (indexOfLastResult < results.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Nobel Prize Search</h1>
      <div className="input-container">
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
        <div className="pagination-buttons">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={nextPage} disabled={indexOfLastResult >= results.length}>Next</button>
        </div>
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