import { Schema } from "mongoose";
import { ICategory } from "../category/category.types";
import { IWord } from "../word/word.types";

export interface ITournament {
    _id:string;
    name: string,
    organizer: Schema.Types.ObjectId | string,
    categories: ICategory[],
    startDate: Date,
    endDate: Date,
    isCompleted?: boolean,
    level: Schema.Types.ObjectId,
    status: Schema.Types.ObjectId | string,
    words: IWord[],
    extraWords: IExtraWord[]
    wordLimit: number,
    toBeFeatured: boolean,
    participants?: string[]
}

export interface IExtraWord{
    name: string,
    categories: string[],
    level: string
}