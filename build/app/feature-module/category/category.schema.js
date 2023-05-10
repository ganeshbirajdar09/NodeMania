"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const baseSchema_1 = require("../../utility/baseSchema");
const categorySchema = new baseSchema_1.BaseSchema({
    name: {
        type: String,
        required: true
    }
});
exports.CategoryModel = (0, mongoose_1.model)("categories", categorySchema);
