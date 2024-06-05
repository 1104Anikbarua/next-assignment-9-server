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
        profile: zod_1.z
            .object({
            bio: zod_1.z.string({ required_error: "Bio is required!" }).optional(),
            age: zod_1.z
                .number({ required_error: "Age is required!" })
                .positive({ message: "Pleae provide a positive number" })
                .optional(),
        })
            .optional(),
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
// change password start here
const changePassword = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string({
            required_error: "Current password is required!",
        }),
        newPassword: zod_1.z.string({
            required_error: "New password is required!",
        }),
    }),
});
// change password ends here
// refresh token route
const refreshToken = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: "Refresh token is required!" }),
    }),
});
exports.authValidations = {
    createUserValidation,
    loginValidation,
    changePassword,
    refreshToken,
};
