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
import { convertFormatErrors } from '../../helpers/convert-format-errors.helper';
import { sendEmail } from '../../helpers/send-email.helper';
import { generateCodeToken } from '../../helpers/generate-code-token.helper';
import { User, Verify } from '../../models';
import _ from 'lodash';
import {UserObjectService} from "../../services/user-object.service";

export class AuthController {
    /**
     * send verify code to email
     * @param req
     * @param res
     * @returns {any}
     */
    public static sendVerifyToken(req, res) {
        /* Get validate errors */
        const errors = validationResult(req).array() || [];
        const contentObject = convertFormatErrors(req.body, errors);

        if (contentObject) {
            return res.json({ success: false, error: contentObject });
        }

        const code = generateCodeToken();

        sendEmail(req.body.email, 'Reset Password', `Code: ${code}`, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                Verify.deleteOne({ email: req.body.email }).then((data) => {
                    const verify = new Verify({
                        email: req.body.email,
                        code,
                    });

                    verify.save();
                });
            }
        });

        return res.json({ success: true });
    }

    /**
     * verify to active account
     * @param req
     * @param res
     * @returns {any}
     */
    public static verifyHandle(req, res) {
        /* Get validate errors */
        const errors = validationResult(req).array() || [];
        const contentObject = convertFormatErrors(req.body, errors);

        if (contentObject) {
            return res.json({ success: false, error: contentObject });
        }

        User.findOneAndUpdate({ email: req.body.email }, { is_active: true }).then((user) => {
            console.log(user);
        });

        return res.json({ success: true });
    }

    /**
     * get current account that being login
     * @param req
     * @param res
     */
    public static getCurrentUser(req, res) {
        User.findOne({ email: _.get(req, 'cookies.auth.email') }).then(user => {
            res.json(UserObjectService.convert(user));
        });
    }
}
