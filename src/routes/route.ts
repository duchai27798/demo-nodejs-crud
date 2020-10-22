/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */
import webRouter from './web/web.route';
import apiRouter from './api/api.route';
import csrf from 'csurf';

export function activeRoute(app) {
    app.get('/', (req, res) => res.redirect('/web'));
    app.use(
        '/web',
        csrf({ cookie: true }),
        function (req, res, next) {
            const token = req.csrfToken();
            res.cookie('XSRF-TOKEN', token);
            res.locals.csrfToken = token;
            next();
        },
        webRouter
    );
    app.use('/api', apiRouter);
}
