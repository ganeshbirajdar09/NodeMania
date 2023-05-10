import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/baseSchema";
import { IWord } from "./word.types";

const wordSchema = new BaseSchema({
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [Schema.Types.ObjectId],
    },
    level: {
        type: Schema.Types.ObjectId
    }
});

type WordDocument = Document & IWord;

export const WordModel = model<WordDocument>("words", wordSchema);
