import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Laureate {
  id: string;
  firstname: string;
  surname: string;
  motivation: string;
  share: string;
  category: string;
  year: string;
}

const useNobelPrizes = () => {
  const [data, setData] = useState<Laureate[]>([]);
  const [results, setResults] = useState<Laureate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 12;

  useEffect(() => {
    axios.get('https://api.nobelprize.org/v1/prize.json')
      .then(response => {
        const prizes = response.data.prizes;
        const formattedData = prizes.flatMap((prize: any) => 
          prize.laureates ? prize.laureates.map((laureate: any) => ({
            ...laureate,
            category: prize.category,
            year: prize.year
          })) : []
        );
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return { data, results, setResults, currentPage, setCurrentPage, resultsPerPage };
};

export default useNobelPrizes;
