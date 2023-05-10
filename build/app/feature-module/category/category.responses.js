"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_RESPONSES = void 0;
exports.CATEGORY_RESPONSES = {
    ALREADY_EXISTS: {
        statusCode: 409,
        message: "category already exists"
    },
    INVALID_TOKEN: {
        statusCode: 401,
        message: "Unauthorized"
    },
    NOT_FOUND: {
        statusCode: 404,
        message: 'category not found'
    },
    UPDATE_SUCCESS: {
        statusCode: 201,
        message: 'category updated successfully'
    },
    UPDATE_FAILURE: {
        statusCode: 403,
        message: 'could not update the category'
    },
    DELETE_SUCCESS: {
        statusCode: 200,
        message: 'category deleted successfully'
    },
    DELETE_FAILURE: {
        statusCode: 403,
        message: 'could not delete the category'
    },
};
