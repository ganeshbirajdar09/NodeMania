"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_DATA = exports.COMMENT_TYPES = exports.STATUSES = exports.ROLES = void 0;
exports.ROLES = {
    ADMIN: "643f81c87eb0fc7fadaa86a8",
    USER: "643f81c87eb0fc7fadaa86a9"
};
exports.STATUSES = {
    PENDING: "643f822f7eb0fc7fadaa86ac",
    APPROVED: "643f822f7eb0fc7fadaa86ad",
    REJECTED: "643f822f7eb0fc7fadaa86ae"
};
exports.COMMENT_TYPES = {
    TOURNAMENT: "tournament",
    REQUEST: "request",
};
exports.ADMIN_DATA = [{
        username: "admin",
        email: "a@admin.com",
        password: "admin",
        role: exports.ROLES.ADMIN
    }];
