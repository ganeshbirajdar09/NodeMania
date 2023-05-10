"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_TYPES = void 0;
//TODO:
exports.NOTIFICATION_TYPES = {
    COMMENT_FLAG: (tournamentName) => `Your comment in ${tournamentName} was flagged`,
    TOURNAMENT_APPROVE: (tournamentName) => `Your ${tournamentName} was approved`,
    TOURNAMENT_REJECT: (tournamentName) => `Your ${tournamentName} was rejected`,
};
