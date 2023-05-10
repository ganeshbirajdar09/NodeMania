"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const level_schema_1 = require("./level.schema");
const create = (level) => level_schema_1.LevelModel.create(level);
const find = (pipeline) => level_schema_1.LevelModel.aggregate(pipeline);
const findOne = (filter) => level_schema_1.LevelModel.findOne(filter);
const update = (filter, data) => level_schema_1.LevelModel.updateMany(filter, data);
exports.default = {
    find,
    create,
    findOne,
    update,
};
