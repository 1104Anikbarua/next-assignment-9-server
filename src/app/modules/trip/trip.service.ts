const createTrip = async (payload: {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: string[];
}) => {
  console.log(payload);
};
// export trip services functions starts here
export const tripServices = { createTrip };
// export trip services functions ends here
