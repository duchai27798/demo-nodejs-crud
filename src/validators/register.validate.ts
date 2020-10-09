/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { body, oneOf } from 'express-validator';

export const validateRegister = () => {
    return oneOf([
        body('fullName', 'Full name does not Empty').not().isEmpty(),
        body('email', 'Email does not Empty').not().isEmpty(),
        body('email', 'Email format is wrong').not().isEmail(),
        body('password', 'password more than 6 digits').isLength({ min: 6 }),
    ]);
};
