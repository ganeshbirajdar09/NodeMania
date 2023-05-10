"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const baseSchema_1 = require("../../utility/baseSchema");
const userSchema = new baseSchema_1.BaseSchema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    allTimeWins: {
        type: Number,
        required: false,
        default: 0
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "roles",
        required: true
    },
    isModerator: {
        type: Boolean,
    }
});
exports.UserModel = (0, mongoose_1.model)("users", userSchema);
