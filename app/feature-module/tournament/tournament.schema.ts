import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/baseSchema";
import { STATUSES } from "../../utility/constants";
import { ITournament } from "./tournament.types";

const tournamentSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: "categories",
    required: true
  },
  participants: {
    type: [Schema.Types.ObjectId],
    ref: "participants",
    default: []
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: "levels",
    required: true
  },
  status: {
    type: Schema.Types.ObjectId,
    default: STATUSES.PENDING
  },
  words: {
    type: [Schema.Types.ObjectId],
    ref: "words"
  },
  extraWords: {
    type: [{
      name: String,
      categories: [Schema.Types.ObjectId],
    }],
    ref: "categories"
  },
  wordLimit: {
    type: Number,
    required: true,
    default: 10
  },
  toBeFeatured: {
    type: Boolean,
    default: false
  }
});

type TournamentDocument = Document & ITournament;

export const TournamentModel = model<TournamentDocument>("tournaments", tournamentSchema);
