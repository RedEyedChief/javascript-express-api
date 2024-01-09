import { params }   from "@ampt/sdk";
import SHAPES       from '../constants/shapes.js'; 
import ERROR_CODE   from '../constants/error_codes';
import PRICES       from "../constants/prices.js";

const formDescription = function formDescription({ dimensions, shape, square }) {
    let descString = `
    shape: ${ shape },<br>
    dimensions: {<br>`;
    
    for( let[ key, value ] of Object.entries( dimensions )) {
        descString += `&emsp;${ key }: ${ value/10 } cm,<br>`;
    }
    descString += `},<br>
    square: ${ square }`

    return descString;
};

export function calculateSquareAndPrice({ shape, dimensions }) {
    // const square = dimensions.height * dimensions.width / 100;
    const {
        mainHeight,
        mainWidth,
        subHeight,
        subWidth
    } = dimensions;
    let square = '';

    switch( shape ) {
        case SHAPES.rectangle:
            square = mainHeight * mainWidth / 100;
            break;

        case SHAPES.rightTriangle:
        case SHAPES.symmetricalTriangle:
            square = mainHeight * mainWidth / 200;
            break;

        case SHAPES.pentagonSlant:
            const cutHeight = mainHeight - subHeight;
            const cutWidth = mainWidth - subWidth;
            const cutSquare = cutHeight * cutWidth / 200;
            const mainSquare = mainHeight * mainWidth / 100;

            square = mainSquare - cutSquare;
            break;

        case SHAPES.rectangleSlant:
        case SHAPES.gableWindow:    
            const sepHeight = mainHeight - subHeight;
            const rectangleSquare = subHeight * mainWidth / 100;
            const trianleSquare = sepHeight * mainWidth /200;

            square = rectangleSquare + trianleSquare;
            break;     

        case SHAPES.doubleSlant:
            const trapHeight = mainHeight - subHeight;
            const trapSquare = ( subWidth + mainWidth ) / ( 200 * trapHeight );
            const recSquare = subHeight * mainWidth / 100;
            
            square = recSquare + trapSquare;
            break;          

        case SHAPES.trapezoid:
            square = ( subWidth + mainWidth ) / ( 200 * mainHeight );
            break;   

        case SHAPES.circle:
            square = Math.PI * mainWidth * mainWidth / 100;
            break;

        case SHAPES.circlePart:
            const radius = mainHeight / 2 + ( mainWidth * mainWidth / ( 8 * mainHeight ) );
            square = ( radius * radius * Math.acos( ( radius - mainHeight ) / mainHeight ) - ( radius - mainHeight ) * Math.sqrt( 2 * radius * mainHeight - mainHeight * mainHeight ) ) / 100;
            break;

        case SHAPES.oval:
            const smallRadius = mainWidth / 2;
            const bigRadius = mainHeight / 2;

            square = Math.PI * bigRadius * smallRadius / 100;
            break;

        default:
            throw {
                type: ERROR_CODE.serverError,
                message: 'wrong logic flow'
            };
    }

    square = Math.ceil( square ) / 10000;
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
    
    return { square, price };
}

export function prepareProduct({ title, shape, dimensions, quantity, imageUrl }) {
    const { square, price } = calculateSquareAndPrice({ shape, dimensions });
    const description = formDescription({ dimensions, shape, square });

    return {
        title:        title,
        body_html:   `<p>${ description }</p>`,
        product_type: 'custom',
        options: [{
            name: 'Personalization option',
            values: [ 'Original product' ]
        }],
        variants: [{
            option1:               'Original product',
            price:                 price,
            inventory_quantity:    quantity,
            inventory_policy:      'deny',
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