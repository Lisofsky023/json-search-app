import { loadJsonData } from './dataLoader';

export type Email = string;
export type PhoneNumber = string;

export interface SearchResultItem {
  email: Email;
  number: PhoneNumber;
}

export type SearchResult = SearchResultItem[];

export async function jsonSearch(email: Email, number: PhoneNumber): Promise<SearchResult> {

  try {
    const data = await loadJsonData();

    if (!data) {
      console.log('No data found');
      return [];
    }

    const result = data.filter((item: SearchResultItem) => {
      const emailMatches = email ? item.email.toLowerCase().includes(email.toLowerCase()) : true;
      const numberMatches = number ? formatNumberForComparison(item.number) === formatNumberForComparison(number) : true;

      return emailMatches && numberMatches;
    });

    return result;
  } catch (error) {
    console.error('Error during data loading or processing:', error);
    throw error;
  }
}

export function formatNumberForComparison(phoneNumber: PhoneNumber): string {
  return phoneNumber.replace(/-/g, '').toLowerCase();
}
