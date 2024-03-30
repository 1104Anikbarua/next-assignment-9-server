import { Status } from "@prisma/client";
import { prisma } from "../../utlis/prisma.utlis";

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

// respond to travel buddy starts here
const respondRequest = async (
  id: string,
  payload: { status: Status; tripId: string },
) => {
  //   checking is buddy exists or not
  await prisma.travelBuddy.findUniqueOrThrow({
    where: {
      id,
    },
  });

  //   if buddy exists update buddy
  const result = await prisma.travelBuddy.update({
    where: { id },
    data: payload,
  });
  return result;
};
// respond to travel buddy ends here
// export travel buddy service functions start here
export const travelBuddyServices = {
  getTravelBuddies,
  respondRequest,
};
// export travel buddy service functions ends here
