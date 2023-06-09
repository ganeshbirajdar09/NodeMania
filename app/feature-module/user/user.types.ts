import { Schema } from "mongoose";

export interface IUser {
  _id?: Schema.Types.ObjectId,
  username: string,
  email: string,
  password: string,
  role?: string,
  allTimeWins?: number,
  isModerator?:boolean
}
