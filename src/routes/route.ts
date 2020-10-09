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
import { validationResult, body, oneOf, check } from 'express-validator';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', validateRegister, (req, res) => {
    /* Get validate errors */
    // const { nestedErrors } = validationResult(req).array()[0];

    console.log(validationResult(req));

    res.render('register');
});

export default router;
