import { Schema } from "mongoose";

export interface IComment {
    _id?: Schema.Types.ObjectId | string,
    type: string,
    userId: Schema.Types.ObjectId | string,
    isFlagged?: boolean,
    tournamentId: Schema.Types.ObjectId | string,
    message: string,
}