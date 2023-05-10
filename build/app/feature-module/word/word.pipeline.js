"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWords = void 0;
const database_utilities_1 = require("../../utility/database.utilities");
const getAllWords = (filterParam, queryData) => {
    const pipeline = [
        {
            $match: filterParam
        },
        {
            $lookup: {
                from: "levels",
                localField: "level",
                foreignField: "_id",
                as: "levelDetails"
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categories",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                level: { _id: { $arrayElemAt: ['$levelDetails._id', 0] }, name: { $arrayElemAt: ['$levelDetails.name', 0] } },
                // categories: ["$categoryDetails.name","$categoryDetails._id"]
            }
        }
    ];
    return pipeline.concat((0, database_utilities_1.genericPipeline)(queryData));
};
exports.getAllWords = getAllWords;
