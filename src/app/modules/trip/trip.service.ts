import { Prisma, PrismaClient } from "@prisma/client";
import { IPayload } from "./trip.interface";
// create a instance from prisma client
const prisma = new PrismaClient();

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
// create trip ends here
// console.dir(fieldToSearch, { depth: Infinity });
const getPaginationInfo = (...info: Array<string | undefined>) => {
  const [page, limit, sortBy, sortOrder] = info;

  const pages = Number(page) || 1;

  // how many data to take
  const limits = Number(limit) || 10;

  // how many page to skip
  const skip = (pages - 1) * limits;

  // how to show the data(by default sortby=budget and sortorder=desc )
  const orderBy = {
    [sortBy ? sortBy : "budget"]: sortOrder ? sortOrder : "desc",
  };

  return { pages, limits, skip, orderBy };
};
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
  const { pages, skip, limits, orderBy } = getPaginationInfo(
    page,
    limit,
    sortBy,
    sortOrder
  );

  let fieldToSearch: Prisma.TripWhereInput[] = [];
  // partial search
  if (searchTerm) {
    fieldToSearch.push({
      OR: ["destination"].map((key) => ({
        [key]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
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
