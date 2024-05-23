import { z } from "zod";

const updateUserValidations = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Plese provide a valid email address" })
      .optional(),
  }),
});

export const userValidations = {
  updateUserValidations,
};
