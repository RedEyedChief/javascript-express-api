import ShopifyClient        from '../ShopifyClient.js';

const create = async function create( createBody ) {
    try {
        const product = await ShopifyClient.product.create( createBody );
        
        return product;

    } catch( error ) {
        console.error(' - Products model -> create - ');

        throw error;
    }
};

const get = async function get( id ) {
    try {
        const product = await ShopifyClient.product.get( id, {} );
        
        return product;

    } catch( error ) {
        console.error(' - Products model -> get - ');

        throw error;
    }
};

const update = async function update( id, updateBody ) {
    try {
        const product = await ShopifyClient.product.update( id, updateBody );
        
        return product;

    } catch( error ) {
        console.error(' - Products model -> update - ');

        throw error;
    }
};

export default {
    create,
    update,
    get
};