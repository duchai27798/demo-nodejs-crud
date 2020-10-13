/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { User } from '../../models';
import bcrypt from 'bcrypt';
import { registerService } from '../../services/register.service';

export class AuthController {
    public static register = (req, res) => {
        return res.render('register', { content: req.session.content || null });
    };

    public static handleRegister = (req, res) => {
        registerService(req, res, (data) => {
            return res.redirect('/login');
        }, error => {
            req.session.content = error;
            return res.redirect('/register');
        });
    };

    public static login = (req, res) => {
        return res.render('login', { errors: req.session.errors || null });
    };

    public static handleLogin = (req, res) => {
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
