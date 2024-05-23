import { z } from "zod";
import { travelType } from "./trip.constant";

// // trip validation starts here
// const createTripValidation = z.object({
//   body: z.object({
//     destination: z.string({ required_error: "Destination is required" }),
//     startDate: z.string({ required_error: "Start date is required" }),
//     endDate: z.string({ required_error: "End date is required" }),
//     budget: z
//       .number({ required_error: "Budget is required" })
//       .positive({ message: "Please provide a positive number" }),
//     activities: z.array(
//       z.string({ required_error: "Activitites is required" }),
//     ),
//   }),
// });
// create travel validation starts here

const createTravelValidation = z.object({
  body: z.object({
    destination: z.string({ required_error: "Destination is required" }),
    description: z.string({ required_error: "Description is required" }),
    startDate: z.string({ required_error: "Start date is required" }),
    endDate: z.string({ required_error: "End date is required" }),
    travelType: z.enum([...travelType] as [string, ...string[]]),
    budget: z
      .number({ required_error: "Budget is required" })
      .positive({ message: "Please provide a positive number" }),
    activities: z.array(
      z.string({ required_error: "Activitites is required" }),
    ),
  }),
});
// create trip validation ends here
//
// request buddy validation start here
const requestBuddyValidations = z.object({
  body: z.object({
    userId: z.string({ required_error: "User id is required" }),
  }),
});
// request buddy validation ends here

const updateTravelValidations = z.object({
  body: z.object({
    destination: z
      .string({ invalid_type_error: "Destinaton must be string" })
      .optional(),
    description: z
      .string({ invalid_type_error: "Desciption must be string" })
      .optional(),
    startDate: z
      .string({ invalid_type_error: "Start date must be string" })
      .optional(),
    endDate: z
      .string({ invalid_type_error: "End date must be string" })
      .optional(),
    budget: z
      .number()
      .positive({ message: "Please provide a positive number" })
      .optional(),
    travelType: z.enum([...travelType] as [string, ...string[]]).optional(),
    activities: z
      .array(z.string({ required_error: "Activitites is required" }))
      .optional(),
    itinerary: z
      .array(z.string({ invalid_type_error: "Itinerary must be string" }))
      .optional(),
    location: z
      .array(z.string({ invalid_type_error: "Locaion must be string" }))
      .optional(),
    photos: z
      .array(z.string({ invalid_type_error: "Photos must be string" }))
      .optional(),
  }),
});

// export trip validation shcmea
export const tripValidations = {
  // createTripValidation,
  createTravelValidation,
  requestBuddyValidations,
  updateTravelValidations,
};
