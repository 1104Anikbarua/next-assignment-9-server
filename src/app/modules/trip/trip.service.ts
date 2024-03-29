import { Prisma } from "@prisma/client";
import { IPayload } from "./trip.interface";
import { getPaginationInfo } from "../../utlis/paginationInfo.utlis";
import { prisma } from "../../utlis/prisma.utlis";

// create trip starts here
const createTrip = async (
  id: string,
  payload: {
    userId: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: number;
    activities: string[];
  },
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
// create trip ends here
// console.dir(fieldToSearch, { depth: Infinity });

// get all trip starts here
const getTrips = async (payload: Partial<IPayload>) => {
  const {
    searchTerm,
    //  budget,
    page,
    limit,
    sortBy,
    sortOrder,
    minBudget,
    maxBudget,
    ...exactFilter
  } = payload;
  const { pages, skip, limits, orderBy } = await getPaginationInfo(
    page,
    limit,
    sortBy,
    sortOrder,
  );

  const fieldToSearch: Prisma.TripWhereInput[] = [];
  // partial search
  if (searchTerm) {
    fieldToSearch.push({
      OR: ["destination", "startDate", "endDate", "budget"].map((key) => {
        //checking if the key is budget convert string value to number
        if (key === "budget") {
          return {
            [key]: Number(searchTerm) || 0,
          };
          // else key is not budget
        } else {
          return {
            [key]: {
              contains: searchTerm,
              mode: "insensitive",
            },
          };
        }
      }),
    });
  }

  // exact filter
  if (Object.keys(exactFilter).length) {
    fieldToSearch.push({
      AND: Object.keys(exactFilter).map((key) => ({
        [key]: {
          equals:
            key !== "budget" ? exactFilter[key] : Number(exactFilter[key]),
        },
      })),
    });
  }
  // filter by budget
  if (minBudget && maxBudget) {
    fieldToSearch.push({
      AND: ["budget"].map((key) => ({
        [key]: {
          gte: Number(minBudget),
          lte: Number(maxBudget),
        },
      })),
    });
  }

  //
  const searchField: Prisma.TripWhereInput = { AND: fieldToSearch };

  const result = await prisma.trip.findMany({
    where: searchField,
    skip: skip, //skip page
    take: limits, //number of data to retrieve
    orderBy: orderBy, //show data in asc/desc based on existing field
  });
  //count total document from database
  const total = await prisma.trip.count({
    where: searchField,
  });

  return { meta: { pages, limits, total }, result };
};
// get all trip ends here
// request travel buddy starts here
const requestBuddy = async (id: string, tripId: string) => {
  const isBuddyExists = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const userId = isBuddyExists.id;

  const result = await prisma.travelBuddy.create({
    data: { tripId, userId },
  });
  return result;
};
// request travel buddy ends here
// export trip services functions starts here
export const tripServices = { createTrip, getTrips, requestBuddy };
// export trip services functions ends here
