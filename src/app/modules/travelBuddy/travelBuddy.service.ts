import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// get travel buddies start here

const getTravelBuddies = async (tripId: string) => {
  await prisma.travelBuddy.findFirstOrThrow({ where: { tripId } });
  const result = await prisma.travelBuddy.findMany({
    where: { tripId },
    include: { user: { select: { name: true, email: true } } },
  });

  return result;
};
// get travel buddies ends here
// export travel buddy service functions start here
export const travelBuddyServices = {
  getTravelBuddies,
};
// export travel buddy service functions ends here
