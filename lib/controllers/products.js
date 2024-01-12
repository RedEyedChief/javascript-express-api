import serviceRunner    from '../serviceRunner.js';
import productCreate    from '../services/products/Create.js';
import productUpdate    from '../services/products/Update.js';

export default {
    create: serviceRunner( productCreate ),
    update: serviceRunner( productUpdate )
};

