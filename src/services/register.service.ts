/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models';
import { convertFormatErrors } from '../helpers/convert-format-errors.helper';

/**
 * Handle register
 * @param req
 * @param res
 * @param success
 * @param failure
 * */
export function registerService(req, res, success = (data) => {}, failure = (error) => {}) {
    /* Get validate errors */
    const errors = validationResult(req).array() || [];
    const contentObject = convertFormatErrors(req.body, errors);

    if (contentObject) {
        return failure(contentObject);
    }

    /* Remove confirm password field */
    delete req.body.confirm_password;

    /* Encrypt password and save user */
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                ...req.body,
                password: hash,
            });

            return user.save().then(
                (data) => success(true),
                (err) => failure(err)
            );
        },
        (err) => failure(err)
    );
}
