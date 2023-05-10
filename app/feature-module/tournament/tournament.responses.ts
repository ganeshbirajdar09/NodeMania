export const TOURNAMENT_RESPONSES = {
    ALREADY_EXISTS: {
        statusCode: 409,
        message: "tournament already exists"
    },
    NOT_FOUND: {
        statusCode: 404,
        message: 'tournament not found'
    },
    CREATE_SUCCESS: {
        statusCode: 201,
        message: 'tournament created successfully'
    },
    CREATE_FAILURE: {
        statusCode: 403,
        message: 'Could not create the tournament'
    },
    UPDATE_SUCCESS: {
        statusCode: 201,
        message: 'tournament updated successfully'
    },
    UPDATE_FAILURE: {
        statusCode: 403,
        message: 'Could not update the tournament'
    },
    DELETE_SUCCESS: {
        statusCode: 200,
        message: 'tournament deleted successfully'
    },
    DELETE_FAILURE: {
        statusCode: 403,
        message: 'Could not delete the tournament'
    },
    JOIN_SUCCESS: {
        statusCode: 200,
        message: 'you have successfully joined the tournament'
    },
    LEAVE_SUCCESS: {
        statusCode: 200,
        message: 'you have successfully left the tournament'
    },
    ADDED_TO_FEATURED: {
        statusCode: 200,
        message: 'successfully added the tournament to featured list'
    },
    PARTICIPANT_REMOVED: {
        statusCode: 200,
        message: 'Participant removed from the tournament'
    },
    NO_DATA_TO_DISPLAY: {
        statusCode: 404,
        message: 'no data to display',
    },
    TOURNAMENT_ALREADY_REJECTED: {
        statusCode: 400,
        message: "tournament is already rejected"
    },
    TOURNAMENT_ALREADY_APPROVED: {
        statusCode: 400,
        message: "tournament is already approved"
    },
    FORBIDDEN: {
        statusCode: 403,
        message: "you are FORBIDDEN"
    },
    OWN_TOURNAMENT: {
        statusCode: 409,
        message: "you can't join your own tournamnet"
    },
    PLAY_SUCCESS: {
        statusCode: 200,
        message: "you have completed the tournament"
    },

}
