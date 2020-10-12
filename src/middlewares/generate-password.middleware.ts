/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

export function generatePassword(req, res, next) {

    req.body.password = '123456';
    req.body.confirm_password = '123456';

    next()
}