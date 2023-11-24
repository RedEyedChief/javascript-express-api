import Shopify      from 'shopify-api-node';
import { params }   from "@ampt/sdk";

const client = new Shopify({
    shopName: params( 'STORE_NAME' ),
    accessToken: params( 'APP_ACCESS_TOKEN' ),
    apiVersion: '2023-10',
    timeout: 600000
});

export default client;
