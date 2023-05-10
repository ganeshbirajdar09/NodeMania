"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordModel = void 0;
const mongoose_1 = require("mongoose");
const baseSchema_1 = require("../../utility/baseSchema");
const wordSchema = new baseSchema_1.BaseSchema({
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [mongoose_1.Schema.Types.ObjectId],
    },
    level: {
        type: mongoose_1.Schema.Types.ObjectId
    }
});
exports.WordModel = (0, mongoose_1.model)("words", wordSchema);
