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
import { User } from '../models';

export function validateEmail() {
    return [
        check('email')
            .not()
            .isEmpty()
            .withMessage('Email does not Empty')
            .isEmail()
            .withMessage('Email format is wrong')
            .custom((value) => {
                /* Check that email has been existed */
                return User.findOne({ email: value }).then((user) => {
                    if (!user) {
                        return Promise.reject('Email isn\'t existed');
                    }
                });
            }),
    ];
}
