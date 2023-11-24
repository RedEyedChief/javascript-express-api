import Products             from '../../models/Products.js';
import runValidation        from '../../LIVRvalidation.js';
import { PRODUCT_CREATE }   from '../../utils/validationRules.js';

const rules = {
    data : [ 'required', { 'nested_object' : {
        ...PRODUCT_CREATE
    } } ]
};

const productCreate = async function productCreate({ body }) {
    try {
        const data = runValidation( rules, body );
        const product = await Products.create( data );

        return { data: product };

    } catch ( error ) {
        console.error(' - productCreate - ');

        throw error;
    }
};

export default productCreate;
