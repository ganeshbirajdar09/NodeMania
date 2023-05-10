import { Schema } from "mongoose";

export interface INotification {
    message: string,
    userId: string | Schema.Types.ObjectId
    _id?: string | Schema.Types.ObjectId
}

//TODO:
export const NOTIFICATION_TYPES = {
    COMMENT_FLAG: (tournamentName: string) => `Your comment in ${tournamentName} was flagged`,
    COMMENT_FLAG_REVOKE: (tournamentName: string) => `Flag on your comment in ${tournamentName} was revoked `,
    TOURNAMENT_APPROVE: (tournamentName: string) => `Your ${tournamentName} was approved`,
    TOURNAMENT_REJECT: (tournamentName: string) => `Your ${tournamentName} was rejected`,
    ADMIN_REVIEW: (tournamentName: string) => `admin has replid to your ${tournamentName} tournament request`,
    USER_REVIEW: (tournamentName: string) => `  ${tournamentName}'s organizer has replid to your review comment`,
    CONGRATULATIONS: (tournamentName: string) => `Congratulations on winning the ${tournamentName} tournament , check your mail box for further updates`,
    JOIN: (tournamentName: string) => `You joined ${tournamentName} tournament `,
    LEFT: (tournamentName: string) => `You left ${tournamentName} tournament `,
    WAS_FEATURED: (tournamentName: string) =>`your ${tournamentName} was added to the official featured list of tournaments`
}