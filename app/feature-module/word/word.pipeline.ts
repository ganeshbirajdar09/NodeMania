import { FilterQuery, PipelineStage } from "mongoose";
import { IWord } from "./word.types";
import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";

export const getAllWords = (filterParam: FilterQuery<IWord>, queryData: IGenericPipleline) => {
    const pipeline: PipelineStage[] = [
        {
            $match: filterParam
        },
        {
            $lookup: {
                from: "levels",
                localField: "level",
                foreignField: "_id",
                as: "levelDetails"
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categories",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                level: { _id: { $arrayElemAt: ['$levelDetails._id', 0] }, name: { $arrayElemAt: ['$levelDetails.name', 0] } },
                // categories: ["$categoryDetails.name","$categoryDetails._id"]
            }
        }
    ];

    return pipeline.concat(genericPipeline(queryData));
}