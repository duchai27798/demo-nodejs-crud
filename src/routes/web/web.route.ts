/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import express from 'express';
import { validateRegister } from '../../validators/register.validate';
import { AuthController } from '../../controllers/web/auth.controller';
import { checkAuth, checkVerify } from '../../middlewares/auth.middleware';
import { HomeController } from '../../controllers/web/home.controller';
import { validateEmail } from '../../validators/email.validator';
import { validateResetPasswordToken } from '../../validators/reset-password-token.validatior';
import {validateResetPassword} from "../../validators/reset-password.validator";

const webRouter = express.Router();

webRouter.get('/', checkAuth, checkVerify, HomeController.home);

webRouter.get('/login', AuthController.login);

webRouter.post('/login', AuthController.handleLogin);

webRouter.get('/register', AuthController.register);

webRouter.post('/register', validateRegister(), AuthController.handleRegister);

webRouter.get('/logout', AuthController.logout);

webRouter.get('/reset-password', AuthController.resetPassword);

webRouter.post('/reset-password/send', validateEmail(), AuthController.sendLinkResetPassword);

webRouter.get(
    '/reset-password/:token',
    validateResetPasswordToken(),
    AuthController.verifyLinkResetPassword
);

webRouter.post('/reset-password', validateResetPassword(), AuthController.handleResetPassword);

webRouter.get('/verify-email', AuthController.verifyEmail);

webRouter.get('/forbidden', (req, res) => {
   res.render('forbidden');
});

export default webRouter;
