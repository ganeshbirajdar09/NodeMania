export const WORD_RESPONSES = {
    ALREADY_EXISTS: {
        statusCode: 409,
        message: "word already exists"
    },
    NOT_FOUND: {
        statusCode: 404,
        message: 'word not found'
    },
    UPDATE_SUCCESS: {
        statusCode: 201,
        message: 'word updated successfully'
    },
    UPDATE_FAILURE: {
        statusCode: 403,
        message: 'could not update the word'
    },
    DELETE_SUCCESS: {
        statusCode: 200,
        message: 'word deleted successfully'
    },
    DELETE_FAILURE: {
        statusCode: 403,
        message: 'could not delete the word'
    },

}