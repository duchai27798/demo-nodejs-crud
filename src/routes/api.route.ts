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
import multer from 'multer';
import uuid from 'uuid';
import { UploadFileController } from '../controllers/api/upload-file.controller';
import { AuthController } from '../controllers/api/auth.controller';
import { validateEmail } from '../validators/email.validator';
import {validateVerify} from "../validators/verify.validator";

const apiRouter = express.Router();

/* setting upload directory and filename  */
const storage = multer.diskStorage({
    destination: 'src/resources/uploads/',
    filename: (req, file, callback) => {
        if (file['originalname'] !== 'new') {
            callback(null, file['originalname']);
        } else {
            callback(null, uuid());
        }
    },
});

apiRouter.get('/users/:id', UserController.index);

apiRouter.get('/users/:limit/:page/:searchBy?', UserController.getAll);

apiRouter.post('/users/update', UserController.update);

apiRouter.post('/users/create', generatePassword, validateRegister(), UserController.create);

apiRouter.delete('/users/:id/delete', UserController.deleteById);

apiRouter.post(
    '/files/upload',
    multer({ storage }).single('image'),
    UploadFileController.uploadFile
);

apiRouter.post('/send-verify-token', validateEmail(), AuthController.sendVerifyToken);

apiRouter.post('/verify-email', validateEmail(), validateVerify(), AuthController.verifyHandle);

export default apiRouter;
