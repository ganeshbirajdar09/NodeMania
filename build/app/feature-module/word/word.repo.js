"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const word_schema_1 = require("./word.schema");
const create = (word) => word_schema_1.WordModel.create(word);
const findOne = (filter) => word_schema_1.WordModel.findOne(filter);
const find = (pipeline) => word_schema_1.WordModel.aggregate(pipeline);
const update = (filter, data) => word_schema_1.WordModel.updateMany(filter, data);
exports.default = {
    create, findOne,
    update, find
};
