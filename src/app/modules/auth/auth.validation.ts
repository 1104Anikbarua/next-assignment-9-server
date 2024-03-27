import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    email: z
      .string({ required_error: "email is required!" })
      .email({ message: "Please provide a valid email address" }),
    password: z.string({ required_error: "Password is required!" }),

    profile: z.object({
      bio: z.string({ required_error: "Bio is required!" }),
      age: z
        .number({ required_error: "Age is required!" })
        .positive({ message: "Pleae provide a positive number" }),
    }),
  }),
});

export const authValidations = {
  createUserValidation,
};
