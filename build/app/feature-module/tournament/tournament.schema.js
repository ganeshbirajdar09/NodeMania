"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentModel = void 0;
const mongoose_1 = require("mongoose");
const baseSchema_1 = require("../../utility/baseSchema");
const constants_1 = require("../../utility/constants");
const tournamentSchema = new baseSchema_1.BaseSchema({
    name: {
        type: String,
        required: true,
    },
    organizer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    categories: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "categories",
        required: true
    },
    participants: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "participants",
        default: []
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    level: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "levels",
        required: true
    },
    status: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: constants_1.STATUSES.PENDING
    },
    words: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "words"
    },
    extraWords: {
        type: [{
                name: String,
                categories: [mongoose_1.Schema.Types.ObjectId],
            }],
        ref: "categories"
    },
    wordLimit: {
        type: Number,
        required: true,
        default: 10
    },
    toBeFeatured: {
        type: Boolean,
        default: false
    }
});
exports.TournamentModel = (0, mongoose_1.model)("tournaments", tournamentSchema);
