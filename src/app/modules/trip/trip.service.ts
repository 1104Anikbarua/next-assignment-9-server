import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTrip = async (
  id: string,
  payload: {
    userId: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: number;
    activities: string[];
  }
) => {
  //   check the user exists or not using decoded id form token
  const isUserExists = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  //   add the userid in trip payload
  payload.userId = isUserExists.id;

  const result = await prisma.trip.create({
    data: payload,
  });
  return result;
};
// export trip services functions starts here
export const tripServices = { createTrip };
// export trip services functions ends here
