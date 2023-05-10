export const PARTICIPANT_RESPONSES = {
    ALREADY_EXISTS: {
        statusCode: 409,
        message: "you have already joined the tournament"
    },
    INVALID_TOKEN: {
        statusCode: 401,
        message: "Unauthorized"
    },
    NOT_FOUND: {
        statusCode: 404,
        message: 'participant not found'
    },
    UPDATE_SUCCESS: {
        statusCode: 201,
        message: 'participant updated successfully'
    },
    UPDATE_FAILURE: {
        statusCode: 403,
        message: 'could not update the participant'
    },
    DELETE_SUCCESS: {
        statusCode: 200,
        message: 'participant deleted successfully'
    },
    DELETE_FAILURE: {
        statusCode: 403,
        message: 'could not delete the participant'
    },
    ALREADY_PLAYED: {
        statusCode: 400,
        message: "you have already the played the tournament"
    },
    NO_DATA_TO_DISPLAY: {
        statusCode: 404,
        message: 'no data to display',
      },

}