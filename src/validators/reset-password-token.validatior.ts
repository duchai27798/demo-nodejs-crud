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
import { ResetPassword } from '../models';
import { token } from 'morgan';

export function validateResetPasswordToken() {
    return [
        check('token')
            .not()
            .isEmpty()
            .withMessage('Full name does not Empty')
            .custom((value, { req }) => {
                return ResetPassword.findOne({ token: value }).then((user) => {
                    if (!user || user['expired_at'] < Date.now()) {
                        return Promise.reject('Link is wrong or expired');
                    }

                    req.body.email = user['email'];
                    return true;
                });
            })
            .withMessage('Link is wrong or expired'),
    ];
}
