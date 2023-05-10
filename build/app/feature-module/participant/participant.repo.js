"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const participant_schema_1 = require("./participant.schema");
const create = (category) => participant_schema_1.participantModel.create(category);
const find = (pipeline) => participant_schema_1.participantModel.aggregate(pipeline);
const findOne = (filter) => participant_schema_1.participantModel.findOne(filter);
const update = (filter, data) => participant_schema_1.participantModel.updateMany(filter, data);
exports.default = {
    find,
    create,
    findOne,
    update,
};
