"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tournament_schema_1 = require("./tournament.schema");
const create = (tournament) => tournament_schema_1.TournamentModel.create(tournament);
const find = (pipeline) => tournament_schema_1.TournamentModel.aggregate(pipeline);
const findOne = (filter) => tournament_schema_1.TournamentModel.findOne(filter);
const update = (filter, data) => tournament_schema_1.TournamentModel.updateMany(filter, data);
exports.default = {
    find,
    create,
    findOne,
    update,
};
