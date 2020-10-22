/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */
import { validateEmail } from './email.validator';
import { check } from 'express-validator';

export function validateLogin() {
    return [
        ...validateEmail(),
        check('password').not().isEmpty().withMessage('Email does not Empty'),
    ];
}
