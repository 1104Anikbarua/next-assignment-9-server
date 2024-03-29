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
// create trip starts here
const createTrip = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   check the user exists or not using decoded id form token
    const isUserExists = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    //   add the userid in trip payload
    payload.userId = isUserExists.id;
    const result = yield prisma_utlis_1.prisma.trip.create({
        data: payload,
    });
    return result;
});
// create trip ends here
// console.dir(fieldToSearch, { depth: Infinity });
// get all trip starts here
const getTrips = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, 
    //  budget,
    page, limit, sortBy, sortOrder, minBudget, maxBudget } = payload, exactFilter = __rest(payload, ["searchTerm", "page", "limit", "sortBy", "sortOrder", "minBudget", "maxBudget"]);
    const { pages, skip, limits, orderBy } = yield (0, paginationInfo_utlis_1.getPaginationInfo)(page, limit, sortBy, sortOrder);
    const fieldToSearch = [];
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
                }
                else {
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
                    equals: key !== "budget" ? exactFilter[key] : Number(exactFilter[key]),
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
    const searchField = { AND: fieldToSearch };
    const result = yield prisma_utlis_1.prisma.trip.findMany({
        where: searchField,
        skip: skip, //skip page
        take: limits, //number of data to retrieve
        orderBy: orderBy, //show data in asc/desc based on existing field
    });
    //count total document from database
    const total = yield prisma_utlis_1.prisma.trip.count({
        where: searchField,
    });
    return { meta: { pages, limits, total }, result };
});
// get all trip ends here
// request travel buddy starts here
const requestBuddy = (id, tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBuddyExists = yield prisma_utlis_1.prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const userId = isBuddyExists.id;
    const result = yield prisma_utlis_1.prisma.travelBuddy.create({
        data: { tripId, userId },
    });
    return result;
});
// request travel buddy ends here
// export trip services functions starts here
exports.tripServices = { createTrip, getTrips, requestBuddy };
// export trip services functions ends here
