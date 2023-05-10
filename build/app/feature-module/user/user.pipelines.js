"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const database_utilities_1 = require("../../utility/database.utilities");
const getAllUsers = (filterParam, queryData) => {
    const pipeline = [
        {
            $match: filterParam
        },
        {
            $project: {
                password: 0,
            }
        }
    ];
    return pipeline.concat((0, database_utilities_1.genericPipeline)(queryData));
};
exports.getAllUsers = getAllUsers;
