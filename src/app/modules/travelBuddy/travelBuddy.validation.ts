import { z } from "zod";
import { status } from "./travelBuddy.constant";

const respondRequest = z.object({
  body: z.object({
    status: z.enum([...status] as [string, ...string[]]),
  }),
});

export const travelBuddyValidations = {
  respondRequest,
};
