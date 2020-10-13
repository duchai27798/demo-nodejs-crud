/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */
import webRouter from './web.route';
import apiRouter from './api.route';

export function activeRoute(app) {
    app.use('/', webRouter);
    app.use('/api', apiRouter);
}
