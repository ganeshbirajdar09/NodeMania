"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_RESPONSES = void 0;
exports.USER_RESPONSES = {
    NOT_FOUND: {
        statusCode: 404,
        message: 'User not found',
    },
    ALREADY_EXISTS: {
        statusCode: 409,
        message: 'User already exists',
    },
    CREATE_SUCCESS: {
        statusCode: 201,
        message: 'User created successfully',
    },
    CREATE_FAILURE: {
        statusCode: 500,
        message: 'Could not create user',
    },
    UPDATE_SUCCESS: {
        statusCode: 200,
        message: 'User updated successfully',
    },
    UPDATE_FAILURE: {
        statusCode: 500,
        message: 'Could not update user',
    },
    DELETE_SUCCESS: {
        statusCode: 200,
        message: 'User deleted successfully',
    },
    DELETE_FAILURE: {
        statusCode: 500,
        message: 'Could not delete user',
    },
    NO_DATA_TO_DISPLAY: {
        statusCode: 404,
        message: 'no data to display',
    },
    SUCCESSFULL_PROMOTION: {
        statusCode: 200,
        message: 'user promoted to moderator'
    }
};
