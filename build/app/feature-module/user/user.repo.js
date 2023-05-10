"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const create = (user) => user_schema_1.UserModel.create(user);
const findOne = (filterParam) => user_schema_1.UserModel.findOne(filterParam);
const find = (pipeline) => user_schema_1.UserModel.aggregate(pipeline);
const update = (filter, data) => user_schema_1.UserModel.updateMany(filter, data);
exports.default = {
    create,
    findOne,
    find,
    update
};
