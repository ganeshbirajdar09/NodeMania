"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVEL_RESPONSES = void 0;
exports.LEVEL_RESPONSES = {
    ALREADY_EXISTS: {
        statusCode: 409,
        message: "level already exists"
    },
    NOT_FOUND: {
        statusCode: 404,
        message: 'level not found'
    },
    UPDATE_SUCCESS: {
        statusCode: 201,
        message: 'level updated successfully'
    },
    UPDATE_FAILURE: {
        statusCode: 403,
        message: 'could not update the level'
    },
    DELETE_SUCCESS: {
        statusCode: 200,
        message: 'level deleted successfully'
    },
    DELETE_FAILURE: {
        statusCode: 403,
        message: 'could not delete the level'
    },
};
