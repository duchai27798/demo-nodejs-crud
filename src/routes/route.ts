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

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

export default router;