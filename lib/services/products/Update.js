import Products                         from '../../models/Products.js';

const productUpdate = async function productUpdate({ body }) {
    try {
        for ( let i=0; i<body.line_items.length; i++ ) {
            const productId = body.line_items[i].product_id;
            const quantity = body.line_items[i].fulfillable_quantity;
    
            const product = await Products.get( productId );
            const description = JSON.parse( product.body_html );
            description.quantity = quantity;
            const updateData = {
                body_html: JSON.stringify( description )
            }
    
            const response = await Products.update( productId, updateData );
        }
        

        return { data: 'success' };

    } catch ( error ) {
        console.error(' - productUpdate - ');

        throw error;
    }
};

export default productUpdate;
