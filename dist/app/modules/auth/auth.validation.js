"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = void 0;
const zod_1 = require("zod");
// create user validation starts here
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required!" }),
        email: zod_1.z
            .string({ required_error: "email is required!" })
            .email({ message: "Please provide a valid email address" }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
        profile: zod_1.z.object({
            bio: zod_1.z.string({ required_error: "Bio is required!" }),
            age: zod_1.z
                .number({ required_error: "Age is required!" })
                .positive({ message: "Pleae provide a positive number" }),
        }),
    }),
});
// create user validation ends here
// login user validation starts here
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required!" })
            .email({ message: "Please provide a valid email address" }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
});
// login user validation ends here
exports.authValidations = {
    createUserValidation,
    loginValidation,
};
