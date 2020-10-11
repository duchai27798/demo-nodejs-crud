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
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.cookies.auth);
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login', { errors: req.session.errors || null });
});

router.post('/login', AuthController.login);

router.get('/register', (req, res) => {
    res.render('register', { content: req.session.content || null });
});

router.post('/register', validateRegister(), AuthController.register);

export default router;
