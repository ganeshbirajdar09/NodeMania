"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const authorize_1 = require("../utility/authorize");
const routes_types_1 = require("./routes.types");
const index_1 = __importDefault(require("../feature-module/index"));
exports.routes = [
    new routes_types_1.Route("/user", index_1.default.UserRouter),
    new routes_types_1.Route("/auth", index_1.default.AuthRouter),
    new routes_types_1.Route("/level", index_1.default.LevelRouter),
    new routes_types_1.Route("/word", index_1.default.WordRouter),
    new routes_types_1.Route("/category", index_1.default.CategoryRouter),
    new routes_types_1.Route("/tournament", index_1.default.TournamentRouter),
    new routes_types_1.Route("/notification", index_1.default.NotificationRouter),
    new routes_types_1.Route("/comment", index_1.default.CommentRouter),
    new routes_types_1.Route("/participant", index_1.default.ParticipantRouter),
];
exports.excludedPaths = [
    new authorize_1.ExcludedPath("/auth/login", "POST"),
    new authorize_1.ExcludedPath("/auth/register", "POST"),
    new authorize_1.ExcludedPath("/auth/refreshtoken", "POST"),
];
