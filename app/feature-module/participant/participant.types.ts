import { Schema } from "mongoose";

export interface IParticipant {
    userId?: string | Schema.Types.ObjectId,
    tournamentId: string | Schema.Types.ObjectId,
    _id?: string | Schema.Types.ObjectId,
    score?: number,
    timeTaken?: number,
}