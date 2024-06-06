"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripServices = void 0;
const paginationInfo_utlis_1 = require("../../utlis/paginationInfo.utlis");
const prisma_utlis_1 = require("../../utlis/prisma.utlis");
const user_service_1 = require("../user/user.service");
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
const createTravel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check the user exists or not using decoded id form token
    const isUserExists = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    // add the userid in trip payload
    payload.userId = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.id;
    const result = yield prisma_utlis_1.prisma.travel.create({
        data: payload,
    });
    return result;
});
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
const getTravels = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, 
    //  budget,
    page, limit, sortBy, sortOrder, minBudget, maxBudget } = payload, exactFilter = __rest(payload, ["searchTerm", "page", "limit", "sortBy", "sortOrder", "minBudget", "maxBudget"]);
    const { pages, skip, limits, orderBy } = yield (0, paginationInfo_utlis_1.getPaginationInfo)(page, limit, sortBy, sortOrder);
    const fieldToSearch = [];
    // partial search
    if (searchTerm) {
        // convert the searchterm in lowercase
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        // find travel type exists with in array or not
        const travelTypeMatch = ["adventure", "leisure", "business"].find((type) => type === lowerCaseSearchTerm);
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
                budget: budgetValue,
            });
        }
        // Add condition for travelType if it matches
        if (travelTypeMatch) {
            partialSearchConditions.push({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                travelType: travelTypeMatch,
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
                    equals: key !== "budget" ? exactFilter[key] : Number(exactFilter[key]) || 0,
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
    const searchField = { AND: fieldToSearch };
    const result = yield prisma_utlis_1.prisma.travel.findMany({
        where: searchField,
        skip: skip, //skip page
        take: limits, //number of data to retrieve
        orderBy: orderBy, //show data in asc/desc based on existing field
    });
    //count total document from database
    const total = yield prisma_utlis_1.prisma.travel.count({
        where: searchField,
    });
    return { meta: { pages, limits, total }, result };
});
// get all travel ends here
// **List of trips the user has posted.
// get travel by user id start here
const getTravel = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // get user id from token
    const { id: userId } = user;
    // check is user exists or not
    yield prisma_utlis_1.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    // search in the travel model by user id
    const result = yield prisma_utlis_1.prisma.travel.findMany({
        where: { userId },
    });
    return result;
});
// get travel by user id start here
// get travel by id start here
const getTravelById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // search in the travel model by id
    const result = yield prisma_utlis_1.prisma.travel.findUniqueOrThrow({
        where: { id },
        include: {
            user: {
                select: user_service_1.selectField,
            },
        },
    });
    return result;
});
// get travel by id ends here
// request travel buddy starts here
const requestBuddy = (id, travelId) => __awaiter(void 0, void 0, void 0, function* () {
    // check is user exists or not
    const isBuddyExists = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const userId = isBuddyExists === null || isBuddyExists === void 0 ? void 0 : isBuddyExists.id;
    // create a travel buddy request
    const result = yield prisma_utlis_1.prisma.travelBuddy.create({
        data: { userId, travelId },
    });
    return result;
});
// request travel buddy ends here
//List of trips the user has requested to join.
const getRequestedTravels = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    // check user exists or not
    yield prisma_utlis_1.prisma.user.findUniqueOrThrow({ where: { id } });
    // retrive requested travel by user id
    const result = yield prisma_utlis_1.prisma.travelBuddy.findMany({
        where: { userId: id },
        include: { travel: true },
    });
    return result;
});
// get popular travel destination
const getPopularTravels = () => __awaiter(void 0, void 0, void 0, function* () {
    const popularTravels = yield prisma_utlis_1.prisma.travel.findMany({
        include: { TravelBuddy: true, user: { select: user_service_1.selectField } },
    });
    const result = popularTravels
        .map((travel) => (Object.assign({ buddyCount: travel.TravelBuddy.length }, travel)))
        .filter((travel) => travel.buddyCount > 0)
        .sort((a, b) => b.buddyCount - a.buddyCount)
        .slice(0, 5);
    return result;
});
// admin update travel start here
const setTravel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is travel exists or not
    yield prisma_utlis_1.prisma.travel.findUniqueOrThrow({ where: { id } });
    // update travel information
    const result = yield prisma_utlis_1.prisma.travel.update({
        where: { id },
        data: payload,
    });
    return result;
});
// admin remove travel start here
const removeTravel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check is travel exists or not
    yield prisma_utlis_1.prisma.travel.findUniqueOrThrow({ where: { id } });
    // update travel information
    const result = yield prisma_utlis_1.prisma.travel.delete({
        where: { id },
    });
    return result;
});
// admin update travel ends here
// export trip services functions starts here
exports.tripServices = {
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
