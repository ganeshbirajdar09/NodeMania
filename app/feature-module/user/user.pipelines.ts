import { FilterQuery, PipelineStage } from "mongoose";
import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";
import { IUser } from "./user.types";

export const getAllUsers = (filterParam: FilterQuery<IUser>, queryData: IGenericPipleline) => {
    const pipeline: PipelineStage[] = [
        {
            $match: filterParam
        },
        {
            $project: {
                password: 0,

            }
        }

    ];

    return pipeline.concat(genericPipeline(queryData));
}