import { params }   from "@ampt/sdk";
import SHAPES       from '../constants/shapes.js'; 
import ERROR_CODE   from '../constants/error_codes';
import PRICES       from "../constants/prices.js";

const updateDimensionKey = function updateDimensionKey( key ) {
    let newKey = '';

    switch( key ) {
        case 'mainWidth':
            newKey = 'W';
            break;

        case 'subWidth':
            newKey = 'W1';
            break;

        case 'mainHeight':
            newKey = 'H';
            break;

        case 'subHeight':
            newKey = 'H1';
            break;

        default:
            throw {
                type: ERROR_CODE.serverError,
                message: 'wrong process flow'
            };
    }

    return newKey;
}

const formDescription = function formDescription({ dimensions, shape, square, material }) {
    let descString = {
        shape,
        material,
        dimensions: {},
        square: `${ square } cm<sup>2</sup>`,
        createdAt: new Date().toISOString()
    }

    for( let[ key, value ] of Object.entries( dimensions )) {
        let name = updateDimensionKey( key );
        descString.dimensions[name] = `${ value/10 } cm`;
    }

    return descString;
};

export function calculateSquareAndPrice({ shape, dimensions }) {
    const {
        mainHeight,
        mainWidth
    } = dimensions;
    let square = '';

    if ( shape === SHAPES.circle ) {
        square = Math.ceil( mainWidth * mainWidth ) / 1000000;
    } else {
        square = Math.ceil( mainWidth * mainHeight ) / 1000000;
    }
    console.log('square ', square);
    let price = '';

    for( let[ key, value ] of Object.entries( PRICES ) ) {
        if ( !( square > value.from && square <= value.to ) ) {
            continue;
        }

        if ( value.coeff ) {
            price = value.coeff * square + value.price;
        } else {
            price = value.price;
        }

        break;
    }

    if ( !price ) {
        throw {
            type: ERROR_CODE.nonValid,
            message: 'wrong sizes'
        };
    }
    
    square *= 10000;

    return { square, price };
}

export function prepareProduct({ shape, dimensions, imageUrl, material }) {
    const { square, price } = calculateSquareAndPrice({ shape, dimensions });
    const description = formDescription({ dimensions, shape, square, material });

    return {
        title:      `${ shape } - ${ material }`,
        body_html:  JSON.stringify(description),
        product_type: 'custom',
        options: [{
            name: 'Personalization option',
            values: [ 'Original product' ]
        }],
        variants: [{
            option1:               'Original product',
            price:                 price,
            inventory_quantity:    1,
            inventory_policy:      'continue',
            fulfillment_service:   'manual',
            inventory_management:  'shopify'
        }],
        images: [{
            src: imageUrl
        }]
    };
}

export function findShortestAndLongestSides( dimensions ) {
    let shortest = dimensions.mainWidth;
    let longest = dimensions.mainWidth;

    for( let[ key, value ] of Object.entries( dimensions ) ) {
        if ( value < shortest ) {
            shortest = value;
        }
        if ( value > longest ) {
            longest = value;
        }
    }

    return {
        shortest,
        longest
    }
}