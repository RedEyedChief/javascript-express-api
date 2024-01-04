import { params }   from "@ampt/sdk";

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

export function calculateSquareAndPrice( dimensions ) {
    const square = dimensions.height * dimensions.width / 100;

    const price = Math.ceil( square ) * params( "PRICE_PER_METER" ); 
    return { square, price };
}

export function prepareProduct({ title, shape, dimensions, quantity, imageUrl }) {
    const { square, price } = calculateSquareAndPrice( dimensions );
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