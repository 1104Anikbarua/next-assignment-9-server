import { IPayload, ITravel } from "./trip.interface";
import { getPaginationInfo } from "../../utlis/paginationInfo.utlis";
import { prisma } from "../../utlis/prisma.utlis";
import { Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { selectField } from "../user/user.service";

// // create trip starts here
// const createTrip = async (
//   id: string,
//   payload: {
//     userId: string;
//     destination: string;
//     startDate: string;
//     endDate: string;
//     budget: number;
//     activities: string[];
//   },
// ) => {
//   //   check the user exists or not using decoded id form token
//   const isUserExists = await prisma.user.findUniqueOrThrow({
//     where: {
//       id,
//     },
//   });
//   //   add the userid in trip payload
//   payload.userId = isUserExists.id;

//   const result = await prisma.trip.create({
//     data: payload,
//   });
//   return result;
// };
// create trip ends here
// create travel start here
const createTravel = async (id: string, payload: ITravel) => {
  // check the user exists or not using decoded id form token
  const isUserExists = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  // add the userid in trip payload
  payload.userId = isUserExists?.id;
  const result = await prisma.travel.create({
    data: payload,
  });
  return result;
};
// create travel ends here

// get all trip starts here
// const getTrips = async (payload: Partial<IPayload>) => {
//   const {
//     searchTerm,
//     //  budget,
//     page,
//     limit,
//     sortBy,
//     sortOrder,
//     minBudget,
//     maxBudget,
//     ...exactFilter
//   } = payload;
//   const { pages, skip, limits, orderBy } = await getPaginationInfo(
//     page,
//     limit,
//     sortBy,
//     sortOrder,
//   );

//   const fieldToSearch: Prisma.TripWhereInput[] = [];
//   // partial search
//   if (searchTerm) {
//     fieldToSearch.push({
//       OR: ["destination", "startDate", "endDate", "budget"].map((key) => {
//         //checking if the key is budget convert string value to number
//         if (key === "budget") {
//           return {
//             [key]: Number(searchTerm) || 0,
//           };
//           // else key is not budget
//         } else {
//           return {
//             [key]: {
//               contains: searchTerm,
//               mode: "insensitive",
//             },
//           };
//         }
//       }),
//     });
//   }

//   // exact filter
//   if (Object.keys(exactFilter).length) {
//     fieldToSearch.push({
//       AND: Object.keys(exactFilter).map((key) => ({
//         [key]: {
//           equals:
//             key !== "budget" ? exactFilter[key] : Number(exactFilter[key]) || 0,
//         },
//       })),
//     });
//   }
//   // filter by budget
//   if (minBudget && maxBudget) {
//     fieldToSearch.push({
//       AND: ["budget"].map((key) => ({
//         [key]: {
//           gte: Number(minBudget),
//           lte: Number(maxBudget),
//         },
//       })),
//     });
//   }

//   //
//   const searchField: Prisma.TripWhereInput = { AND: fieldToSearch };

//   const result = await prisma.trip.findMany({
//     where: searchField,
//     skip: skip, //skip page
//     take: limits, //number of data to retrieve
//     orderBy: orderBy, //show data in asc/desc based on existing field
//   });
//   //count total document from database
//   const total = await prisma.trip.count({
//     where: searchField,
//   });

//   return { meta: { pages, limits, total }, result };
// };
// get all trip ends here
// get all travel starts here
const getTravels = async (payload: Partial<IPayload>) => {
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
  const fieldToSearch: Prisma.TravelWhereInput[] = [];

  // partial search
  if (searchTerm) {
    // convert the searchterm in lowercase
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    // find travel type exists with in array or not
    const travelTypeMatch = ["adventure", "leisure", "business"].find(
      (type) => type === lowerCaseSearchTerm,
    );
    // Partial search conditions for string fields
    const partialSearchConditions = [
      "destination",
      "startDate",
      "endDate",
      "description",
    ].map((key) => ({
      [key]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));

    // Add condition for budget if search term can be a number
    const budgetValue = Number(searchTerm);
    if (budgetValue) {
      partialSearchConditions.push({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        budget: budgetValue as any,
      });
    }
    // Add condition for travelType if it matches
    if (travelTypeMatch) {
      partialSearchConditions.push({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        travelType: travelTypeMatch as any,
      });
    }

    // partial search by or operator
    fieldToSearch.push({
      OR: partialSearchConditions,
    });
  }

  // exact filter
  if (Object.keys(exactFilter).length) {
    fieldToSearch.push({
      AND: Object.keys(exactFilter).map((key) => ({
        [key]: {
          equals:
            key !== "budget" ? exactFilter[key] : Number(exactFilter[key]) || 0,
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

  // condition to filter
  const searchField: Prisma.TravelWhereInput = { AND: fieldToSearch };
  const result = await prisma.travel.findMany({
    where: searchField,
    skip: skip, //skip page
    take: limits, //number of data to retrieve
    orderBy: orderBy, //show data in asc/desc based on existing field
  });
  //count total document from database
  const total = await prisma.travel.count({
    where: searchField,
  });

  return { meta: { pages, limits, total }, result };
};
// get all travel ends here

// **List of trips the user has posted.
// get travel by user id start here
const getTravel = async (user: JwtPayload) => {
  // get user id from token
  const { id: userId } = user;
  // check is user exists or not
  await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  // search in the travel model by user id
  const result = await prisma.travel.findMany({
    where: { userId },
  });
  return result;
};
// get travel by user id start here
// get travel by id start here
const getTravelById = async (id: string) => {
  // search in the travel model by id
  const result = await prisma.travel.findUniqueOrThrow({
    where: { id },
    include: {
      user: {
        select: selectField,
      },
    },
  });
  return result;
};
// get travel by id ends here
// request travel buddy starts here
const requestBuddy = async (id: string, travelId: string) => {
  // check is user exists or not
  const isBuddyExists = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const userId = isBuddyExists?.id;
  // create a travel buddy request
  const result = await prisma.travelBuddy.create({
    data: { userId, travelId },
  });
  return result;
};
// request travel buddy ends here

//List of trips the user has requested to join.
const getRequestedTravels = async (user: JwtPayload) => {
  const { id } = user;
  // check user exists or not
  await prisma.user.findUniqueOrThrow({ where: { id } });
  // retrive requested travel by user id
  const result = await prisma.travelBuddy.findMany({
    where: { userId: id },
    include: { travel: true },
  });
  return result;
};
// get popular travel destination
const getPopularTravels = async () => {
  const popularTravels = await prisma.travel.findMany({
    include: { TravelBuddy: true, user: { select: selectField } },
  });

  const result = popularTravels
    .map((travel) => ({
      buddyCount: travel.TravelBuddy.length,
      ...travel,
    }))
    .filter((travel) => travel.buddyCount > 0)
    .sort((a, b) => b.buddyCount - a.buddyCount)
    .slice(0, 4);
  return result;
};
// admin update travel start here
const setTravel = async (id: string, payload: Record<string, unknown>) => {
  // check is travel exists or not
  await prisma.travel.findUniqueOrThrow({ where: { id } });
  // update travel information
  const result = await prisma.travel.update({
    where: { id },
    data: payload,
  });
  return result;
};
// admin remove travel start here
const removeTravel = async (id: string) => {
  // check is travel exists or not
  await prisma.travel.findUniqueOrThrow({ where: { id } });
  // update travel information
  const result = await prisma.travel.delete({
    where: { id },
  });
  return result;
};
// admin update travel ends here
// export trip services functions starts here
export const tripServices = {
  // createTrip,
  // getTrips,
  createTravel,
  getTravels,
  getTravel,
  getTravelById,
  requestBuddy,
  getRequestedTravels,
  setTravel,
  removeTravel,
  getPopularTravels,
};
// export trip services functions ends here
