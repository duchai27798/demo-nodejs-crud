/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { User } from '../models';
import _ from 'lodash';

/**
 * check is login
 *
 * @param req
 * @param res
 * @param next
 * @return {any}
 * */
export function checkAuth(req, res, next) {
    if (req.cookies.auth) {
        return next();
    }

    return res.redirect('/web/login');
}

/**
 * check is verify email
 * @param req
 * @param res
 * @param next
 */
export function checkVerify(req, res, next) {
    if (_.get(req, 'cookies.auth.email')) {
        return User.findOne({ email: req.cookies.auth['email'] }).then((user) => {
            if (_.get(user, 'is_active')) {
                next();
            } else {
                req.session.email = _.get(user, 'email');
                res.redirect('/web/verify-email');
            }
        });
    } else {
        res.redirect('/web/login');
    }
}
