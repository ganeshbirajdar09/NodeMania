import { Schema } from "mongoose";

export interface ICategory {
    name: string,
    _id?: string | Schema.Types.ObjectId
}