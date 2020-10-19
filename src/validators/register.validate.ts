/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { check } from 'express-validator';
import _ from 'lodash';
import { User } from '../models';

export function validateRegister() {
    return [
        check('full_name').not().isEmpty().withMessage('Full name does not Empty'),
        check('email')
            .not()
            .isEmpty()
            .withMessage('Email does not Empty')
            .isEmail()
            .withMessage('Email format is wrong')
            .custom((value) => {
                /* Check that email is existed */
                return User.findOne({ email: value }).then((user) => {
                    if (user) {
                        return Promise.reject('E-mail already in use');
                    }
                });
            })
            .withMessage('Email already in use'),
        check('password').isLength({ min: 6 }).withMessage('password more than 6 digits'),
        check('confirm_password')
            .custom((value, { req }) => {
                /* Verify that the confirm password is equal to the password */
                if (!!_.get(req, 'body.password') && value !== _.get(req, 'body.password')) {
                    return false;
                }
                return true;
            })
            .withMessage('Not match with password'),
    ];
}
