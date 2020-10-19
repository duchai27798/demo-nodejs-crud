/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { ResetPassword, User } from '../../models';
import bcrypt from 'bcrypt';
import { registerService } from '../../services/register.service';
import { validationResult } from 'express-validator';
import { convertFormatErrors } from '../../helpers/convert-format-errors.helper';
import { sendEmail } from '../../helpers/send-email.helper';
import { generateCodeToken } from '../../helpers/generate-code-token.helper';

export class AuthController {
    /**
     * show register page
     * @param req
     * @param res
     * @returns {any}
     */
    public static register(req, res) {
        return res.render('register', { content: req.session.content || null });
    }

    /**
     * handle register
     * @param req
     * @param res
     */
    public static handleRegister(req, res) {
        registerService(
            req,
            res,
            (data) => {
                return res.redirect('/login');
            },
            (error) => {
                req.session.content = error;
                return res.redirect('/register');
            }
        );
    }

    /**
     * show login page
     * @param req
     * @param res
     * @returns {any}
     */
    public static login(req, res) {
        return res.render('login', { errors: req.session.errors || null });
    }

    /**
     * handle login
     * @param req
     * @param res
     * @returns {any}
     */
    public static handleLogin(req, res) {
        /* Get user by email */
        return User.findOne({ email: req.body.email }).then((user) => {
            /* If user is exited, check password */
            if (user) {
                return bcrypt.compare(req.body.password, user['password']).then((result) => {
                    /* if login is successful, redirect to home */
                    if (result) {
                        res.cookie(
                            'auth',
                            {
                                email: user['email'],
                            },
                            {
                                maxAge: 60 * 60 * 1000,
                            }
                        );

                        return res.redirect('/');
                    }

                    return AuthController.loginFailed(req, res);
                });
            }

            return AuthController.loginFailed(req, res);
        });
    }

    /**
     * when login is failed then push error for login
     * @param req
     * @param res
     * @returns {any}
     */
    private static loginFailed(req, res) {
        req.session.errors = 'User or password is wrong';

        return res.redirect('/login');
    }

    /**
     * show reset password page
     * @param req
     * @param res
     * @returns {any}
     */
    public static resetPassword(req, res) {
        return res.render('reset-password', {
            content: req.session.content || '',
            email: req.session.email || '',
        });
    }

    /**
     * send link reset password to email
     * @param req
     * @param res
     * @returns {any}
     */
    public static sendLinkResetPassword(req, res) {
        /* Get validate errors */
        const errors = validationResult(req).array() || [];
        const contentObject = convertFormatErrors(req.body, errors);

        /* if errors then push error to view */
        if (contentObject) {
            req.session.content = contentObject;
            return res.redirect('/reset-password');
        }

        const token = generateCodeToken(60);

        /* save token to db */
        ResetPassword.findOneAndUpdate(
            { email: req.body.email },
            {
                email: req.body.email,
                token,
                expired_at: new Date(Date.now() + 60 * 60 * 1000),
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
            (err, doc) => {
                console.log(err);
                console.log(doc);
            }
        );

        /* send link to email */
        sendEmail(
            req.body.email,
            'Reset Password',
            'reset-password.html',
            {
                link: `http://localhost:${process.env.PORT}/reset-password/${token}`,
            },
            (err, info) => {
                console.log(`success: ${info}`);
                console.log(`errors: ${err}`);
            }
        );

        return res.redirect('/login');
    }

    /**
     * check link reset password has been existed and is it still expiry date
     * @param req
     * @param res
     */
    public static verifyLinkResetPassword(req, res) {
        /* Get validate errors */
        const errors = validationResult(req).array() || [];
        const contentObject = convertFormatErrors(req.body, errors);

        /* if errors then push error to view */
        if (contentObject) {
            return res.redirect('/forbidden');
        }

        res.render('form-reset-password', {
            content: contentObject,
            email: req.body.email || null,
        });
    }

    /**
     * change password for account
     * @param req
     * @param res
     */
    public static handleResetPassword(req, res) {
        /* Get validate errors */
        const errors = validationResult(req).array() || [];
        const contentObject = convertFormatErrors(req.body, errors);

        /* if errors then push error to view */
        if (contentObject) {
            res.render('form-reset-password', {
                content: contentObject,
                email: req.body.email || null,
            });
        }

        /* Encrypt password and save user */
        bcrypt.hash(req.body.password, 10).then((hash) => {
            return User.findOneAndUpdate(
                { email: req.body.email },
                {
                    password: hash,
                }
            );
        }).then(value => {
            console.log(value);
            res.redirect('/login');
        });
    }

    /**
     * show verify email page
     * @param req
     * @param res
     * @returns {any}
     */
    public static verifyEmail(req, res) {
        return res.render('verify-email', {
            errors: req.session.errors,
            email: req.session.email,
        });
    }

    /**
     * handle logout
     * @param req
     * @param res
     * @returns {any}
     */
    public static logout(req, res) {
        res.cookie('auth', { maxAge: Date.now() });

        return res.redirect('/login');
    }
}
