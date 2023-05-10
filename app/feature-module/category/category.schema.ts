import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/baseSchema";
import { ICategory } from "./category.types";

const categorySchema = new BaseSchema({
    name: {
        type: String,
        required: true
    }
});

type CategoryDocument = Document & ICategory;

export const CategoryModel = model<CategoryDocument>("categories", categorySchema);
