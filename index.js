import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", routes);

app.listen(3000, () => { console.log("Server started on port 3000")});