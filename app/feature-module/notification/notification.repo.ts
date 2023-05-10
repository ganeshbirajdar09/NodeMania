import { PipelineStage } from "mongoose";
import { NotificationModel } from "./notification.schema"
import { INotification } from "./notification.types"

const create = (notification: INotification) => NotificationModel.create(notification)

const find = (pipeline: PipelineStage[]) => NotificationModel.aggregate(pipeline);

export default {
    create, find
}