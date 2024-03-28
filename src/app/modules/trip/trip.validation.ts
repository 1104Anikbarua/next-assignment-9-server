import { z } from "zod";

// trip validation starts here
const createTripValidation = z.object({
  body: z.object({
    destination: z.string({ required_error: "Destination is required" }),
    startDate: z.string({ required_error: "Start date is required" }),
    endDate: z.string({ required_error: "End date is required" }),
    budget: z
      .number({ required_error: "Budget is required" })
      .positive({ message: "Please provide a positive number" }),
    activities: z.array(
      z.string({ required_error: "Activitites is required" })
    ),
  }),
});
// create trip validation ends here
//

const requestBuddyValidations = z.object({
  body: z.object({
    userId: z.string({ required_error: "User id is required" }),
  }),
});

// export trip validation shcmea
export const tripValidations = {
  createTripValidation,
  requestBuddyValidations,
};
