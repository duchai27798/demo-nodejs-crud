import {check} from "express-validator";
import {User} from "../models";
import _ from "lodash";

/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

export function validateResetPassword() {
    return [
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
    ]
}
