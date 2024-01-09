import ShopifyClient        from '../ShopifyClient.js';
import { prepareProduct }   from '../utils/helpers.js';

const create = async function create( data ) {
    try {
        const createBody = prepareProduct( data );
        throw 'success mock';
        // const product = await ShopifyClient.product.create( createBody );
        
        return product;

    } catch( error ) {
        console.error(' - Products model -> create - ');

        throw error;
    }
};

export default {
    create,
};