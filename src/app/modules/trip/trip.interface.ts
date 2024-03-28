export interface IPayload {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  searchTerm: string;
  page: string;
  limit: string;
  sortBy: string;
  sortOrder: string;
  minBudget: string;
  maxBudget: string;
  [key: string]: unknown;
}
