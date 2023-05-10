import { FilterQuery, PipelineStage } from "mongoose";
import { ICategory } from "./category.types";
import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";

export const getAllCategories = (filterParam: FilterQuery<ICategory>, queryData: IGenericPipleline) => {
    const pipeline: PipelineStage[] = [
        {
            $match: filterParam
        },

    ];

    return pipeline.concat(genericPipeline(queryData));
}
