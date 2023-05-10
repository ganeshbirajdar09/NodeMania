import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/baseSchema";
import { IParticipant } from "./participant.types";

const participantSchema = new BaseSchema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    timeTaken: {
        type: Number,
        default: 0
    },
    tournamentId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

type ParticipantDocument = Document & IParticipant;

export const participantModel = model<ParticipantDocument>("participants", participantSchema);
