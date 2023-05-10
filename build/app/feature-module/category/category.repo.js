"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_schema_1 = require("./category.schema");
const create = (category) => category_schema_1.CategoryModel.create(category);
const find = (pipeline) => category_schema_1.CategoryModel.aggregate(pipeline);
const findOne = (filter) => category_schema_1.CategoryModel.findOne(filter);
const update = (filter, data) => category_schema_1.CategoryModel.updateMany(filter, data);
const findAll = (filter) => category_schema_1.CategoryModel.find(filter);
exports.default = {
    find,
    create,
    findOne,
    update,
    findAll
};
