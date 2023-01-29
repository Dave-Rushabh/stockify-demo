import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './db-config/DBConfig.js';
import { router } from './routes/route.js';

// create express HTTP server with Node Js
const app = express();

// adding middlewares for server to use cors, json & env variables
app.use(express.json());
app.use(cors());
const envErrorsIdentifier = dotenv.config({ debug: process.env.DEBUG });

if (envErrorsIdentifier.error) {
  throw envErrorsIdentifier.error;
}

// utilizing the port defined in the env file to target the server on this port
const PORT = process.env.PORT_NUMBER;

// Connect the express server with MONGODB
connectDB();

// listen to the routes
app.use('/api', router);

// listeing to the server on the given path
app.listen(PORT || 5000, () => {
  console.log(`server started on ${PORT}`);
});
