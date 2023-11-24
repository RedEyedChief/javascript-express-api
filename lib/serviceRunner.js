import ERROR_CODE from './constants/error_codes.js';

export function serviceRunner( serviceFunction ) {
    return function runService ( req, res ) {
        const reqCollection = {
            body: req.body,
            params: req.params,
            query: req.query
        };

        serviceFunction( reqCollection )
            .then(( data ) => {
                res.status( 200 ).send( data );
            })
            .catch(( error ) => {
                console.error('= ERROR = ', error.response?.body?.errors || error.response?.data?.errors || error);
                let responseStatus = 500; 
                const responseError = {
                    status : 0,
                    error  : {}
                };

                if ( error.response ) { //for API errors
                    responseError.error = {
                        code    : error.response.statusMessage,
                        message : error.response?.body?.errors || error.response?.data?.errors
                    };
                    responseStatus = error.response.statusCode;

                    res.status( responseStatus ).send( responseError );
                } else { // for custom errors and others
                    switch( error.type ) {
                        case ERROR_CODE.nonValid:
                            responseError.error = {
                                code    : error.type,
                                message : error.message
                            };
                            responseStatus = 400;
                            break;

                        case ERROR_CODE.notFound:
                            responseError.error = {
                                code    : error.type,
                                message : error.message
                            };
                            responseStatus = 404;
                            break;

                        case ERROR_CODE.alreadyExist:
                            responseError.error = {
                                code    : error.type,
                                message : error.message
                            };
                            responseStatus = 409;
                            break;

                        default:
                            responseError.error = {
                                code    : ERROR_CODE.serverError,
                                message : error.message ? error.message : error
                            };
                            responseStatus = 500;
                            break;
                    }

                    res.status( responseStatus ).send( responseError );
                }
            });
    };
}

export default serviceRunner;
