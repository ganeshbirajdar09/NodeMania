"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const database_utilities_1 = require("../../utility/database.utilities");
const getAllCategories = (filterParam, queryData) => {
    const pipeline = [
        {
            $match: filterParam
        },
    ];
    return pipeline.concat((0, database_utilities_1.genericPipeline)(queryData));
};
exports.getAllCategories = getAllCategories;
