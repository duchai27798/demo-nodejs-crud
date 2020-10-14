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
import { UserController } from '../controllers/api/user.controller';
import { validateRegister } from '../validators/validate';
import { generatePassword } from '../middlewares/generate-password.middleware';

const apiRouter = express.Router();

apiRouter.get('/users/:id', UserController.index);

apiRouter.get('/users/:limit/:page/:searchBy?', UserController.getAll);

apiRouter.post('/users/update', UserController.update);

apiRouter.post('/users/create', generatePassword, validateRegister(), UserController.create);

apiRouter.delete('/users/:id/delete', UserController.deleteById);

export default apiRouter;
