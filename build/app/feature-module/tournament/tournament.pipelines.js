"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersByTournamentsCreated = exports.usersByParticipations = exports.usersByHighestPoints = exports.getAllTournaments = void 0;
const database_utilities_1 = require("../../utility/database.utilities");
const getAllTournaments = (filterParam, queryData) => {
    const pipeline = [
        {
            $match: filterParam
        },
    ];
    return pipeline.concat((0, database_utilities_1.genericPipeline)(queryData));
};
exports.getAllTournaments = getAllTournaments;
const usersByHighestPoints = () => [
    {
        $group: {
            _id: "$userId",
            totalScore: { $sum: "$score" }
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    },
    { $unwind: "$user" },
    {
        $project: {
            userName: "$user.name",
            _id: "$user._id",
            totalScore: 1
        }
    },
    { $sort: { totalScore: -1 } },
];
exports.usersByHighestPoints = usersByHighestPoints;
const usersByParticipations = () => [
    {
        $group: {
            _id: "$userId",
            count: { $sum: 1 }
        }
    },
    {
        $sort: { count: -1 }
    },
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $project: {
            _id: 0,
            userId: "$_id",
            count: 1,
            userName: "$user.name"
        }
    }
];
exports.usersByParticipations = usersByParticipations;
const usersByTournamentsCreated = () => [
    {
        $group: {
            _id: "$organizer",
            count: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "organizer",
            foreignField: "_id",
            as: "organizer"
        }
    },
    {
        $project: {
            _id: 0,
            organizer: {
                $arrayElemAt: ["$organizer", 0]
            },
            count: 1
        }
    },
    {
        $sort: {
            count: -1
        }
    }
];
exports.usersByTournamentsCreated = usersByTournamentsCreated;
