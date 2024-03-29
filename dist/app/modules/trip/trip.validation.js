"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripValidations = void 0;
const zod_1 = require("zod");
// trip validation starts here
const createTripValidation = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string({ required_error: "Destination is required" }),
        startDate: zod_1.z.string({ required_error: "Start date is required" }),
        endDate: zod_1.z.string({ required_error: "End date is required" }),
        budget: zod_1.z
            .number({ required_error: "Budget is required" })
            .positive({ message: "Please provide a positive number" }),
        activities: zod_1.z.array(zod_1.z.string({ required_error: "Activitites is required" })),
    }),
});
// create trip validation ends here
//
const requestBuddyValidations = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: "User id is required" }),
    }),
});
// export trip validation shcmea
exports.tripValidations = {
    createTripValidation,
    requestBuddyValidations,
};
