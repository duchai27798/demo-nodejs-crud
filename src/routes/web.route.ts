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
import { validateRegister } from '../validators/register.validate';
import { AuthController } from '../controllers/web/auth.controller';
import { checkAuth } from '../middlewares/auth.middleware';
import { HomeController } from '../controllers/web/home.controller';

const webRouter = express.Router();

webRouter.get('/', checkAuth, HomeController.home);

webRouter.get('/login', AuthController.login);

webRouter.post('/login', AuthController.handleLogin);

webRouter.get('/register', AuthController.register);

webRouter.post('/register', validateRegister(), AuthController.handleRegister);

export default webRouter;
