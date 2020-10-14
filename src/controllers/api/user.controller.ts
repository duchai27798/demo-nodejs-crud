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
import { registerService } from '../../services/register.service';

export class UserController {
    /**
     * Get all user with pagination
     * @default limit = 5, skip = 0
     * @param req
     * @param res
     */
    public static getAll(req, res) {
        const skip = req.params['page'] > 0 ? (req.params['page'] - 1) * req.params['limit'] : 0;
        let searchBy = {};

        if (req.params.searchBy) {
            searchBy = {
                $or: [
                    { full_name: { $regex: req.params.searchBy, $options: 'i' } },
                    { email: { $regex: req.params.searchBy, $options: 'i' } },
                ],
            };
        }

        User.find(searchBy)
            .limit(req.params['limit']++ || 5)
            .skip(skip)
            .then((users) => {
                const listUsers = users.map((user) => ({
                    _id: user['_id'],
                    full_name: user['full_name'],
                    is_active: user['is_active'],
                    email: user['email'],
                }));

                User.count(searchBy, (err, count) => {
                    res.json({
                        listUsers,
                        size: count,
                        page: req.params['page']++,
                    });
                });
            });
    }

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
        registerService(
            req,
            res,
            (data) => {
                res.json({ success: true });
            },
            (error) => {
                res.json({ success: false, error });
            }
        );
    }

    /**
     * delete user by id
     * @param req
     * @param res
     */
    public static deleteById(req, res) {
        User.deleteOne({ _id: req.params.id }).then(
            (data) => res.json(data),
            (err) => res.json(err)
        );
    }
}
