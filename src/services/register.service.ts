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
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { User } from '../models';

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
    const errorObject = {};

    /* Transform errors array to object with key is field name */
    errors.forEach((field) => {
        errorObject[field.param] = errorObject[field.param] || field;
    });

    if (!_.isEmpty(errors)) {
        const contentObject = {};

        /* put error into the corresponding field  */
        _.forEach(_.keys(req.body), (field) => {
            contentObject[field] = {
                value: _.get(req, `body.${field}`),
            };

            if (errorObject[field]) {
                contentObject[field]['msg'] = errorObject[field].msg;
            }
        });

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

            console.log(user)

            return user.save().then(
                (data) => success(true),
                (err) => failure(err)
            );
        },
        (err) => failure(err)
    );
}
