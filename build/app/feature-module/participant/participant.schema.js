"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantModel = void 0;
const mongoose_1 = require("mongoose");
const baseSchema_1 = require("../../utility/baseSchema");
const participantSchema = new baseSchema_1.BaseSchema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    timeTaken: {
        type: Number,
        default: 0
    },
    tournamentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
exports.participantModel = (0, mongoose_1.model)("participants", participantSchema);
