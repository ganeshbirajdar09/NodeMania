"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const baseSchema_1 = require("../../utility/baseSchema");
const commentSchema = new baseSchema_1.BaseSchema({
    type: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    tournamentId: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        required: true
    }
});
exports.CommentModel = (0, mongoose_1.model)("comments", commentSchema);
