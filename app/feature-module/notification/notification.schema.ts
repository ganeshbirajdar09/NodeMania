import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/baseSchema";
import { INotification } from "./notification.types";

const notificationSchema = new BaseSchema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

type NotificationDocument = Document & INotification;

export const NotificationModel = model<NotificationDocument>("notifications", notificationSchema);
