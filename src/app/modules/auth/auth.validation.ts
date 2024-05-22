import { z } from "zod";

// create user validation starts here
const createUserValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    email: z
      .string({ required_error: "email is required!" })
      .email({ message: "Please provide a valid email address" }),
    password: z.string({ required_error: "Password is required!" }),

    profile: z
      .object({
        bio: z.string({ required_error: "Bio is required!" }).optional(),
        age: z
          .number({ required_error: "Age is required!" })
          .positive({ message: "Pleae provide a positive number" })
          .optional(),
      })
      .optional(),
  }),
});
// create user validation ends here
// login user validation starts here
const loginValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required!" })
      .email({ message: "Please provide a valid email address" }),
    password: z.string({ required_error: "Password is required!" }),
  }),
});
// login user validation ends here

// change password start here
const changePassword = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "Current password is required!",
    }),
    newPassword: z.string({
      required_error: "New password is required!",
    }),
  }),
});
// change password ends here
export const authValidations = {
  createUserValidation,
  loginValidation,
  changePassword,
};
