"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripValidations = void 0;
const zod_1 = require("zod");
const trip_constant_1 = require("./trip.constant");
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
const createTravelValidation = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string({ required_error: "Destination is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
        startDate: zod_1.z.string({ required_error: "Start date is required" }),
        endDate: zod_1.z.string({ required_error: "End date is required" }),
        travelType: zod_1.z.enum([...trip_constant_1.travelType]),
        budget: zod_1.z
            .number({ required_error: "Budget is required" })
            .positive({ message: "Please provide a positive number" }),
        activities: zod_1.z.array(zod_1.z.string({ required_error: "Activitites is required" })),
    }),
});
// create trip validation ends here
//
// request buddy validation start here
const requestBuddyValidations = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: "User id is required" }),
    }),
});
// request buddy validation ends here
const updateTravelValidations = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z
            .string({ invalid_type_error: "Destinaton must be string" })
            .optional(),
        description: zod_1.z
            .string({ invalid_type_error: "Desciption must be string" })
            .optional(),
        startDate: zod_1.z
            .string({ invalid_type_error: "Start date must be string" })
            .optional(),
        endDate: zod_1.z
            .string({ invalid_type_error: "End date must be string" })
            .optional(),
        budget: zod_1.z
            .number()
            .positive({ message: "Please provide a positive number" })
            .optional(),
        travelType: zod_1.z.enum([...trip_constant_1.travelType]).optional(),
        activities: zod_1.z
            .array(zod_1.z.string({ required_error: "Activitites is required" }))
            .optional(),
        itinerary: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: "Itinerary must be string" }))
            .optional(),
        location: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: "Locaion must be string" }))
            .optional(),
        photos: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: "Photos must be string" }))
            .optional(),
    }),
});
// export trip validation shcmea
exports.tripValidations = {
    // createTripValidation,
    createTravelValidation,
    requestBuddyValidations,
    updateTravelValidations,
};
