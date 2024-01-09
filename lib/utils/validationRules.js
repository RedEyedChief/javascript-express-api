import ERROR_CODE from '../constants/error_codes';

export const PRODUCT_CREATE = ( shapeType ) => {
    console.log('shapeType ', shapeType);
    if ( !shapeType.length ) {
        throw {
            type: ERROR_CODE.nonValid,
            message: 'field shape required'
        };  
    }

    return {
        ...SHAPES[ shapeType ],    
        shape: [ 'required', 'string' ],
        material: [ 'required', 'string' ],
        imageUrl: [ 'required', 'string' ],
        title: [ 'required', 'string' ]
    };
}

export const DIMENSIONS = {
    shortest: [ 'required', 'number', 'positive_decimal', { 'number_between': [ 10, 1250 ] } ],
    longest: [ 'required', 'number', 'positive_decimal', { 'number_between': [ 150, 3000 ] } ]
}

const SHAPES = {
    rectangle: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    pentagonSlant: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    rectangleSlant: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    doubleSlant: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    trapezoid: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    rightTriangle: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    symmetricalTriangle: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    gableWindow: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    rectangleArced: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    circle: {
        dimensions: [ 'required', { 'nested_object' : {
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    circlePart: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    oval: {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
}