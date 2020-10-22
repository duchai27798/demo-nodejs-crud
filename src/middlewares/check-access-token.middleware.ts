/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import _ from 'lodash';
import jwt from 'jsonwebtoken';

/**
 * check that json web token is existed
 * @param req
 * @param res
 * @param next
 */
export function checkAccessToken(req, res, next) {
    /* check that token type is Bearer */
    if (
        _.get(req, 'headers.authorization') &&
        _.includes(_.get(req, 'headers.authorization'), 'Bearer')
    ) {
        /* verify token and get info from token */
        jwt.verify(
            _.split(_.get(req, 'headers.authorization'), ' ').pop(),
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    res.json(err);
                } else {
                    req.body.email = decoded['email'];
                    next();
                }
            }
        );
    } else {
        res.json({ message: 'unauthorized' });
    }
}
