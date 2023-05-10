export const COMMENT_RESPONSES = {
    ALREADY_EXISTS: {
        statusCode: 409,
        message: "comment already exists"
    },
    INVALID_TOKEN: {
        statusCode: 401,
        message: "Unauthorized"
    },
    NOT_FOUND: {
        statusCode: 404,
        message: 'comment not found'
    },
    CREATE_SUCCESS: {
        statusCode: 201,
        message: 'comment created successfully'
    },
    CREATE_FAILURE: {
        statusCode: 403,
        message: 'could not create the comment'
    },
    UPDATE_SUCCESS: {
        statusCode: 200,
        message: 'comment updated successfully'
    },
    UPDATE_FAILURE: {
        statusCode: 403,
        message: 'could not update the comment'
    },
    DELETE_SUCCESS: {
        statusCode: 200,
        message: 'comment deleted successfully'
    },
    DELETE_FAILURE: {
        statusCode: 403,
        message: 'could not delete the comment'
    },
    FLAGGED_SUCCESS: {
        statusCode: 200,
        message: 'comment flagged successfully'
    },
    FORBIDDEN: {
        statusCode: 403,
        message: "you are FORBIDDEN"
    },
}
