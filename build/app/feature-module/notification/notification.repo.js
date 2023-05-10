"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_schema_1 = require("./notification.schema");
const create = (notification) => notification_schema_1.NotificationModel.create(notification);
const find = (pipeline) => notification_schema_1.NotificationModel.aggregate(pipeline);
exports.default = {
    create, find
};
