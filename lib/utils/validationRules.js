import ERROR_CODE               from '../constants/error_codes';
import { default as SH_CONST }  from '../constants/shapes.js'; 

export const PRODUCT_CREATE = ( shapeType ) => {
    console.log('shapeType ', shapeType);
    if ( !shapeType ) {
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

export const DIMENSIONS = ( shapeType ) => {
    console.log('shapeType ', shapeType);
    if ( !shapeType ) {
        throw {
            type: ERROR_CODE.nonValid,
            message: 'field shape required'
        };  
    }

    const rules = {
        longest: [ 'required', 'number', 'positive_decimal', { 'number_between': [ 150, 3000 ] } ]
    };

    if ( shapeType !== SH_CONST.circle ) {
        rules.shortest = [ 'required', 'number', 'positive_decimal', { 'number_between': [ 10, 1250 ] } ]
    }

    return rules;
}

const SHAPES = {
    "Rectangle": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Pentagon Slant": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    "Rectangle Slant": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    "Double Slant": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    "Trapezoid": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    "Right-Angled Triangle": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Symmetrical Triangle": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Gable Window": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    "Rectangle Arced": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    "Circle": {
        dimensions: [ 'required', { 'nested_object' : {
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Circle Part": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Oval": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
}