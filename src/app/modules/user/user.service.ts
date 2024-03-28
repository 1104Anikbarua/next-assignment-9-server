import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getProfile = async () => {
  const result = await prisma.userProfile.findUniqueOrThrow();
};

export const userServices = {
  getProfile,
};
