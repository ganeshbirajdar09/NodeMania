"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelModel = void 0;
const mongoose_1 = require("mongoose");
const baseSchema_1 = require("../../utility/baseSchema");
const levelSchema = new baseSchema_1.BaseSchema({
    name: {
        type: String,
        required: true
    }
});
exports.LevelModel = (0, mongoose_1.model)("levels", levelSchema);
