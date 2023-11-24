import serviceRunner    from '../serviceRunner.js';
import productCreate  from '../services/products/Create.js';

export default {
    create: serviceRunner( productCreate ),
};

