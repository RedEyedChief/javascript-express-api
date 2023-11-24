export const PRODUCT_CREATE = {
    dimensions: [ 'required', { 'nested_object' : {
        height: [ 'required', 'number' ],
        width: [ 'required', 'number' ]
    }}],    
    shape: [ 'required', 'string' ],
    quantity: [ 'required', 'number' ],
    material: [ 'required', 'string' ],
    imageUrl: [ 'required', 'string' ],
    title: [ 'required', 'string' ]
};

