import { FilterQuery, Schema, Types } from "mongoose";
import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";
import notificationRepo from "./notification.repo"
import { INotification } from "./notification.types"
import { Payload } from "../auth/auth.types";
import { USER_RESPONSES } from "../user/user.responses";

const create = async (notification: INotification) => await notificationRepo.create(notification);

const getAll = async (queryData: IGenericPipleline = {}, user: Payload) => {
    const pipeline = genericPipeline({ userId: new Types.ObjectId(user.id), sortFilter: "createdAt", sortOrder: "desc", ...queryData })
    const result = await notificationRepo.find(pipeline)
    if (result.length < 1) throw USER_RESPONSES.NO_DATA_TO_DISPLAY
    return result
}

const generateNotificationMessage = (messsage: string) => {
    
}

export default {
    create, getAll
}