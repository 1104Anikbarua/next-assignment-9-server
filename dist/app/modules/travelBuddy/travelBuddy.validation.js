"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelBuddyValidations = void 0;
const zod_1 = require("zod");
const travelBuddy_constant_1 = require("./travelBuddy.constant");
const respondRequest = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...travelBuddy_constant_1.status]),
    }),
});
exports.travelBuddyValidations = {
    respondRequest,
};
