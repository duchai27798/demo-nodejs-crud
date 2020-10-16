/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { Verify } from '../models';
import { check } from 'express-validator';

export function validateVerify() {
    return [
        check('code')
            .not()
            .isEmpty()
            .withMessage('Code does not Empty')
            .isLength({ min: 6, max: 6 })
            .withMessage("code's format is XXXXXX")
            .custom((value, { req }) => {
                return Verify.findOne({ email: req.body.email }).then((verify) => {
                    if (verify) {
                        if (verify['code'].trim() !== value.trim()) {
                            return Promise.reject('E-mail already in use');
                        }
                    }
                    return true;
                });
            })
            .withMessage('Code is wrong or expired'),
    ];
}
