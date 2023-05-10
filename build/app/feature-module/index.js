"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user/user.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const word_routes_1 = __importDefault(require("./word/word.routes"));
const category_routes_1 = __importDefault(require("./category/category.routes"));
const level_routes_1 = __importDefault(require("./level/level.routes"));
const tournament_routes_1 = __importDefault(require("./tournament/tournament.routes"));
const notification_routes_1 = __importDefault(require("./notification/notification.routes"));
const comment_routes_1 = __importDefault(require("./comment/comment.routes"));
const participant_routes_1 = __importDefault(require("./participant/participant.routes"));
exports.default = {
    UserRouter: user_routes_1.default,
    AuthRouter: auth_routes_1.default,
    WordRouter: word_routes_1.default,
    CategoryRouter: category_routes_1.default,
    LevelRouter: level_routes_1.default,
    TournamentRouter: tournament_routes_1.default,
    NotificationRouter: notification_routes_1.default,
    CommentRouter: comment_routes_1.default,
    ParticipantRouter: participant_routes_1.default
};
