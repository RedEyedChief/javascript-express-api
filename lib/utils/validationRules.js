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
        flip: [ 'string' ],
        material: [ 'required', 'string' ],
        imageUrl: [ 'required', 'string' ]
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
    "Rechteck": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Fünfeck Schräg": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    "Rechteck Schräg": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    "Doppelschräge": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    "Trapez": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subWidth: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainWidth' } ]
        }}]
    },
    "Dreieck": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Dreieck symmetrisch": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Giebelfenster": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    "Rechteck mit Bogen": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ],
            subHeight: [ 'required', 'number', 'positive_decimal', { 'smaller_than': 'mainHeight' } ]
        }}]
    },
    "Kreis": {
        dimensions: [ 'required', { 'nested_object' : {
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Kreisabschnitt": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
    "Oval / Ellipse": {
        dimensions: [ 'required', { 'nested_object' : {
            mainHeight: [ 'required', 'number', 'positive_decimal' ],
            mainWidth: [ 'required', 'number', 'positive_decimal' ]
        }}]
    },
}