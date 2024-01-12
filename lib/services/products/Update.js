import Products                         from '../../models/Products.js';

const productUpdate = async function productUpdate({ body }) {
    try {
        const productId = body.line_items[0].product_id;
        const quantity = body.line_items[0].fulfillable_quantity;

        const product = await Products.get( productId );
        const description = JSON.parse( product.body_html );
        description.quantity = quantity;
        const updateData = {
            body_html: JSON.stringify( description )
        }

        const updatedProduct = await Products.update( productId, updateData );

        return { data: updatedProduct };

    } catch ( error ) {
        console.error(' - productUpdate - ');

        throw error;
    }
};

export default productUpdate;
