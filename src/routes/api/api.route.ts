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
import multer from 'multer';
import uuid from 'uuid';
import { UploadFileController } from '../../controllers/api/upload-file.controller';
import { AuthController } from '../../controllers/api/auth.controller';
import { validateEmail } from '../../validators/email.validator';
import { validateVerify } from '../../validators/verify.validator';
import { validateLogin } from '../../validators/login.validator';
import { checkAccessToken } from '../../middlewares/check-access-token.middleware';
import userRouter from './user.route';

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

apiRouter.get('/current-user', AuthController.getCurrentUser);

apiRouter.post(
    '/files/upload',
    multer({ storage }).single('image'),
    UploadFileController.uploadFile
);

apiRouter.post('/send-verify-token', validateEmail(), AuthController.sendVerifyToken);

apiRouter.post('/verify-email', validateEmail(), validateVerify(), AuthController.verifyHandle);

apiRouter.post('/auth/login', validateLogin(), AuthController.login);

apiRouter.get('/auth/current-user', checkAccessToken, AuthController.getCurrentUser);

apiRouter.use('/users', userRouter);

export default apiRouter;
