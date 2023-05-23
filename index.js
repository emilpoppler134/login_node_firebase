import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", routes);

app.listen(3000, () => { console.log("Server started on port 3000")});