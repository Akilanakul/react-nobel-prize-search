import { Laureate } from '../hooks/useNobelPrizes';

export const fuzzyMatch = (str: string, term: string) => {
  const termLen = term.length;
  const strLen = str.length;
  if (termLen > strLen) return false;
  if (termLen === strLen) return term === str;

  outer: for (let i = 0, j = 0; i < termLen; i++) {
    const ch = term.charCodeAt(i);
    while (j < strLen) {
      if (str.charCodeAt(j++) === ch) continue outer;
      j++;
    }
    return false;
  }
  return true;
};

export const handleSearch = (
  data: Laureate[], 
  searchName: string, 
  searchMotivation: string, 
  searchCategory: string, 
  searchYear: string, 
  fuzzyMatch: (str: string, term: string) => boolean
) => {
  const lowercasedName = searchName.toLowerCase();
  const lowercasedMotivation = searchMotivation.toLowerCase();
  const lowercasedCategory = searchCategory.toLowerCase();
  const lowercasedYear = searchYear.toLowerCase();

  return data.filter(item => {
    const fullName = `${item.firstname} ${item.surname}`.toLowerCase();
    const matchesName = fuzzyMatch(fullName, lowercasedName);
    const matchesMotivation = fuzzyMatch(item.motivation.toLowerCase(), lowercasedMotivation);
    const matchesCategory = item.category && item.category.toLowerCase().includes(lowercasedCategory);
    const matchesYear = item.year && item.year.includes(lowercasedYear);

    return matchesName && matchesMotivation &&
           (searchCategory === '' || matchesCategory) &&
           (searchYear === '' || matchesYear);
  });
};
