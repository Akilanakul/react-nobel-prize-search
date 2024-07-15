import { Laureate } from '../hooks/useNobelPrizes';

// Normalize strings for comparison (e.g., remove whitespace and convert to lowercase)
const normalizeString = (str: string): string => {
  return str.replace(/\s+/g, '').toLowerCase();
};

// Perform search using simple substring matching
export const handleSearch = (
  data: Laureate[], 
  searchName: string, 
  searchMotivation: string, 
  searchCategory: string, 
  searchYear: string
) => {
  const normalizedSearchName = normalizeString(searchName);
  const normalizedSearchMotivation = normalizeString(searchMotivation);
  const normalizedSearchCategory = normalizeString(searchCategory);
  const normalizedSearchYear = normalizeString(searchYear);

  return data.filter(item => {
    const fullName = `${item.firstname} ${item.surname}`;
    const matchesName = normalizedSearchName ? normalizeString(fullName).includes(normalizedSearchName) : true;
    const matchesMotivation = normalizedSearchMotivation ? normalizeString(item.motivation).includes(normalizedSearchMotivation) : true;
    const matchesCategory = normalizedSearchCategory ? normalizeString(item.category).includes(normalizedSearchCategory) : true;
    const matchesYear = normalizedSearchYear ? normalizeString(item.year).includes(normalizedSearchYear) : true;

    return matchesName && matchesMotivation && matchesCategory && matchesYear;
  });
};
