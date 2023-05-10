import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { WordModel } from "./word.schema";
import { IWord } from "./word.types";

const create = (word: IWord) => WordModel.create(word);

const findOne = (filter: FilterQuery<IWord>) => WordModel.findOne(filter);

const find = (pipeline: PipelineStage[] ) => WordModel.aggregate(pipeline)

const update = (filter: FilterQuery<IWord>, data: UpdateQuery<IWord>) => WordModel.updateMany(filter, data);


export default {
    create,findOne,
    update, find
}
