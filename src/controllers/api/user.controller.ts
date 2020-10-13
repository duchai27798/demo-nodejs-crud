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
import { validationResult } from 'express-validator';

export class UserController {
    /**
     * Get user by id
     * @param req
     * @param res
     */
    public static index(req, res) {
        User.findById(req.params.id).then((user) => {
            res.json({
                _id: user['_id'],
                email: user['email'],
                full_name: user['full_name'],
            });
        });
    }

    /**
     * Update user by id
     * @note: email and password can't be modified
     * @param req
     * @param res
     * @returns { success, error }
     */
    public static update(req, res) {
        return User.updateOne({ _id: req.body._id }, { full_name: req.body.full_name })
            .then((data) => {
                return res.json({ success: true });
            })
            .catch((error) => res.json({ success: false, error }));
    }

    /**
     * Create user, password will be set default
     * @param req
     * @param res
     */
    public static create(req, res) {
        return res.json(validationResult(req));
    }
}
