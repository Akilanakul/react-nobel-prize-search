import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of a Laureate object
export interface Laureate {
  id: string;
  firstname: string;
  surname: string;
  motivation: string;
  share: string;
  category: string;
  year: string;
}

// Custom hook for fetching and managing Nobel Prize data
const useNobelPrizes = () => {
  const [data, setData] = useState<Laureate[]>([]); // State for storing fetched data
  const [results, setResults] = useState<Laureate[]>([]); // State for storing search results
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page number
  const resultsPerPage = 12; // Number of results to display per page

  // Function to fetch data from the Nobel Prize API
  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.nobelprize.org/v1/prize.json');
      const prizes = response.data.prizes;
      // Format the data to include laureates' category and year
      const formattedData = prizes.flatMap((prize: any) =>
        prize.laureates ? prize.laureates.map((laureate: any) => ({
          ...laureate,
          category: prize.category,
          year: prize.year
        })) : []
      );
      setData(formattedData); // Update state with formatted data
    } catch (error) {
      console.error('Error fetching data:', error); // Log any errors
    }
  };

  // useEffect to fetch data on component mount and set up periodic updates
  useEffect(() => {
    fetchData(); // Initial data fetch
    const intervalId = setInterval(fetchData, 60000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return { data, results, setResults, currentPage, setCurrentPage, resultsPerPage };
};

export default useNobelPrizes;
