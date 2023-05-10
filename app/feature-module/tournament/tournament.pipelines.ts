import { FilterQuery, PipelineStage } from "mongoose";
import { IGenericPipleline, genericPipeline } from "../../utility/database.utilities";
import { ITournament } from "./tournament.types";

export const getAllTournaments = (filterParam: FilterQuery<ITournament>, queryData: IGenericPipleline) => {
    const pipeline: PipelineStage[] = [
        {
            $match: filterParam
        },

    ];

    return pipeline.concat(genericPipeline(queryData));
}


export const usersByHighestPoints = () => [
    {
        $group: {
            _id: "$userId",
            totalScore: { $sum: "$score" }
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    },
    { $unwind: "$user" },
    {
        $project: {
            userName: "$user.name",
            _id: "$user._id",
            totalScore: 1
        }
    },
    { $sort: { totalScore: -1 } },
]

export const usersByParticipations = () => [
    {
        $group: {
            _id: "$userId",
            count: { $sum: 1 }
        }
    },
    {
        $sort: { count: -1 }
    },
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $project: {
            _id: 0,
            userId: "$_id",
            count: 1,
            userName: "$user.name"
        }
    }
]

export const usersByTournamentsCreated = () => [
    {
        $group: {
            _id: "$organizer",
            count: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "organizer",
            foreignField: "_id",
            as: "organizer"
        }
    },
    {
        $project: {
            _id: 0,
            organizer: {
                $arrayElemAt: ["$organizer", 0]
            },
            count: 1
        }
    },
    {
        $sort: {
            count: -1
        }
    }
]