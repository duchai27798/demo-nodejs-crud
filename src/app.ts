/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import router from './routes/route';
import bodyParser from 'body-parser';
import logger from 'morgan';

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/root');

app.use(express.static(path.join(__dirname, '/resources')));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/', router);

app.listen(port, () => {
    console.log(`Server run at: http://172.0.0.1:${port}`);
});
