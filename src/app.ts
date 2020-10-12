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
import { activeRoute } from './routes/route';
import bodyParser from 'body-parser';
import logger from 'morgan';
import expressSession from 'express-session';
import { generateHelper } from './helpers/common.helper';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/root');

app.use(express.static(path.join(__dirname, '/resources')));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(
    expressSession({
        secret: 'max',
        saveUninitialized: false,
        resave: false,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

/* Used to protect application */
app.use(csrf({ cookie: true }));
app.use(function (req, res, next) {
    var token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
});

/* Create helper function for view */
generateHelper(app);

/* Active all routing all of application */
activeRoute(app);

app.listen(port, () => {
    console.log(`Server run at: http://172.0.0.1:${port}`);
});
