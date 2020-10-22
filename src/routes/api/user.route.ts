/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { UserController } from '../../controllers/api/user.controller';
import { generatePassword } from '../../middlewares/generate-password.middleware';
import { validateRegister } from '../../validators/register.validate';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/:id', UserController.index);

userRouter.get('/:limit/:page/:searchBy?', UserController.getAll);

userRouter.post('/update', UserController.update);

userRouter.post('/create', generatePassword, validateRegister(), UserController.create);

userRouter.delete('/:id/delete', UserController.deleteById);

export default userRouter;
