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

export interface ITravel {
  userId: string;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  itinerary?: string[];
  location?: string[];
  travelType: "adventure" | "business" | "leisure";
  photos: string[];
  budget: number;
  activities: string[];
}
