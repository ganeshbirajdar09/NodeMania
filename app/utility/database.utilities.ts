import { query } from "express-validator";
import { PipelineStage, Schema, Types } from "mongoose";
import { validate } from "./validate";

export const convertStringToObjectId = (id: string) => new Types.ObjectId(id);
export const convertToBoolean = (key: string, matchFilter: MatchFilter) => matchFilter[key] == 'true' ? true : false

const generateRangeExpression = (key: string, matchFilter: MatchFilter) => {
    for (let val of matchFilter[key]) {
        val = Number(val)
    }
    const expression = { $gte: Math.min(...matchFilter[key]), $lte: Math.max(...matchFilter[key]) };
    return expression
}

export interface IGenericPipleline {
    filters?: any,
    limit?: number,
    page?: string,
    sortFilter?: string,
    sortOrder?: string | number,
    from?: Date,
    to?: Date,
    isDeleted?: string,
    status?: string,
    _id?: string | Schema.Types.ObjectId,
    userId?: string | Types.ObjectId,
    tournamentId?: string | Types.ObjectId,
    type?: string,
    isFlagged?: string
}
type MatchFilter = any

//GENERIC PIPELINE FOR PAGINATION,FILTERING,SORTING
export const genericPipeline = (queryData: IGenericPipleline) => {

    let { limit, page, sortOrder, sortFilter, from, to, ...filter } = queryData;

    if (!page) page = "1"
    let itemLimit = +(limit || 5);
    let skipItems = (Number(page) - 1) * itemLimit;

    const numericFields = ["price", "points", "rating", "allTimeSales", "allTimePoints", "netSales"];

    const booleanFields = ["isModerator", "isFlagged", 'isDeleted']

    let matchFilter: MatchFilter = filter;

    for (let key in matchFilter) {
        if (numericFields.includes(key)) {
            if (typeof matchFilter[key] == "object") {
                matchFilter[key] = generateRangeExpression(key, matchFilter)
            }
            else {
                matchFilter[key] = Number(matchFilter[key])
            }
        }
        if (booleanFields.includes(key)) {
            matchFilter[key] = convertToBoolean(key,matchFilter)
        }
    }

    const pipeline: PipelineStage[] | IGenericPipleline[] = [
        { $match: matchFilter },
    ]


    // from ? pipeline.push({
    //     $match: {
    //         createdAt: { $gte: new Date(from as Date) }
    //     }
    // }) : null;

    // to ? pipeline.push({
    //     $match: {
    //         createdAt: { $lte: new Date(to as Date) }
    //     }
    // }) : null;

    pipeline.push(
        { $skip: skipItems },
        { $limit: itemLimit }
    )

    if (sortFilter) pipeline.push({
        $sort: {
            [sortFilter as string]: sortOrder == "desc" ? -1 : 1
        }
    })
    return pipeline
}


