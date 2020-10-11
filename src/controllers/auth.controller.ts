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
import { User } from '../models';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export class AuthController {
    public static register = (req, res) => {
        /* Get validate errors */
        const errors = validationResult(req).array() || [];
        const errorObject = {};

        /* Transform errors array to object with key is field name */
        errors.forEach((field) => {
            errorObject[field.param] = errorObject[field.param] || field;
        });

        if (!_.isEmpty(errors)) {
            const contentObject = {};

            /* put error into the corresponding field  */
            _.forEach(_.keys(req.body), (field) => {
                contentObject[field] = {
                    value: _.get(req, `body.${field}`),
                };

                if (errorObject[field]) {
                    contentObject[field]['msg'] = errorObject[field].msg;
                }
            });

            req.session.content = contentObject;

            return res.redirect('/register');
        }

        /* Remove confirm password field */
        delete req.body.confirm_password;

        /* Encrypt password and save user */
        bcrypt.hash(req.body.password, 10).then(
            (hash) => {
                const user = new User({
                    ...req.body,
                    password: hash,
                });

                user.save().then(
                    (data) => console.log(data),
                    (err) => console.log(err)
                );
            },
            (err) => console.log(err)
        );

        res.redirect('/login');
    };

    public static login = (req, res) => {
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
    };

    private static loginFailed = (req, res) => {
        req.session.errors = 'User or password is wrong';

        return res.redirect('/login');
    };
}
