import { http }             from "@ampt/sdk";
import express              from "express";
import middlewares          from './lib/middlewares.js';
import router               from './lib/router.js';

const app = express();

app.use( middlewares.json );
app.use( middlewares.cors );

app.use( "/api", router );

http.node.use(app);
