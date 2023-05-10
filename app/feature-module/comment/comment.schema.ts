import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/baseSchema";
import { IComment } from "./comment.types";

const commentSchema = new BaseSchema({
    type: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
    },
    tournamentId: {
        type: Schema.Types.ObjectId
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        required: true
    }
});

type CommentDocument = Document & IComment;

export const CommentModel = model<CommentDocument>("comments", commentSchema);
