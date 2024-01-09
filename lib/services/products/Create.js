import Products                         from '../../models/Products.js';
import runValidation                    from '../../LIVRvalidation.js';
import { PRODUCT_CREATE, DIMENSIONS }   from '../../utils/validationRules.js';
import { findShortestAndLongestSides }  from '../../utils/helpers.js';

const productCreate = async function productCreate({ body }) {
    try {
        const rules = {
            data : [ 'required', { 'nested_object' : {
                ...PRODUCT_CREATE( body.data.shape )
            } } ]
        };
        
        const data = runValidation( rules, body );
        const sides = findShortestAndLongestSides( data.dimensions );
        console.log('sides', sides);

        const test = runValidation( DIMENSIONS, sides );
        console.log('test', test);

        const product = await Products.create( data );

        return { data: product };

    } catch ( error ) {
        console.error(' - productCreate - ');

        throw error;
    }
};

export default productCreate;
