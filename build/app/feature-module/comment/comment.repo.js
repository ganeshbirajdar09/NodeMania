"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./comment.schema");
const create = (notification) => comment_schema_1.CommentModel.create(notification);
const find = (pipeline) => comment_schema_1.CommentModel.aggregate(pipeline);
const findOne = (filter) => comment_schema_1.CommentModel.findOne(filter);
const update = (filter, data) => comment_schema_1.CommentModel.updateMany(filter, data);
exports.default = {
    create, find, findOne, update
};
