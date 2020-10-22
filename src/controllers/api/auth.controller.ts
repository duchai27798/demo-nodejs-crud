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
import { UserObjectService } from '../../services/user-object.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthController {
    /**
     * login
     * @param req
     * @param res
     */
    public static login(req, res) {
        /* Get validate errors */
        const errors = validationResult(req).array() || [];
        const contentObject = convertFormatErrors(req.body, errors);

        /* return errors */
        if (contentObject) {
            return res.json({ success: false, errors: contentObject });
        }

        /* find user */
        User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                /* check password */
                bcrypt.compare(req.body.password, user['password']).then((result) => {
                    /* if login successful then return access token */
                    if (result) {
                        res.json({
                            success: true,
                            /* generate access token by jwt */
                            access_token: jwt.sign(
                                { email: req.body.email },
                                process.env.ACCESS_TOKEN_SECRET,
                                {
                                    expiresIn: process.env.ACCESS_TOKEN_LIFE,
                                }
                            ),
                        });
                    } else {
                        /* return error when password is wrong */
                        res.json({ success: false, message: 'Username or password is wrong' });
                    }
                });
            } else {
                /* return error when account is not existed */
                res.json({ success: false, message: "User isn't existed" });
            }
        });
    }

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

        sendEmail(
            req.body.email,
            'Reset Password',
            'token-verify-email.html',
            {
                code,
            },
            (err, info) => {
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
            }
        );

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
        User.findOne({ email: _.get(req, 'cookies.auth.email') || _.get(req, 'body.email') }).then(
            (user) => res.json(UserObjectService.convert(user)),
            (err) => res.json(err)
        );
    }
}
