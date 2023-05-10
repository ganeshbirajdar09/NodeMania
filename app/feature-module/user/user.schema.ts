import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/baseSchema";
import { IUser } from "./user.types";

const userSchema = new BaseSchema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  allTimeWins: {
    type: Number,
    required: false,
    default: 0
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "roles",
    required: true
  },
  isModerator: {
    type: Boolean,
  }
});

type UserDocument = Document & IUser;

export const UserModel = model<UserDocument>("users", userSchema);
