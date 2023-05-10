"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const baseSchema_1 = require("../../utility/baseSchema");
const notificationSchema = new baseSchema_1.BaseSchema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
exports.NotificationModel = (0, mongoose_1.model)("notifications", notificationSchema);
