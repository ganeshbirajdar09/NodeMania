import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/baseSchema";
import { ILevel } from "./level.types";

const levelSchema = new BaseSchema({
  name: {
    type: String,
    required: true
  }
});

type LevelDocument = Document & ILevel;

export const LevelModel = model<LevelDocument>("levels", levelSchema);
