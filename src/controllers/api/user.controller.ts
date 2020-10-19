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
import {UploadFileController} from "./upload-file.controller";
import {UserObjectService} from "../../services/user-object.service";

export class UserController {
    /**
     * Get all user with pagination
     * @default limit = 5, skip = 0
     * @param req
     * @param res
     */
    public static getAll(req, res) {
        /* config skip how many document */
        const skip = req.params['page'] > 0 ? (req.params['page'] - 1) * req.params['limit'] : 0;
        let searchBy = {};

        /* add search query */
        if (req.params.searchBy) {
            searchBy = {
                $or: [
                    { full_name: { $regex: req.params.searchBy, $options: 'i' } },
                    { email: { $regex: req.params.searchBy, $options: 'i' } },
                ],
            };
        }

        /* find user */
        User.find(searchBy)
            .limit(req.params['limit']++ || 5)
            .skip(skip)
            .then((users) => {
                /* convert user data to list user with format */
                const listUsers = users.map(UserObjectService.convert);

                /* count all user */
                User.countDocuments(searchBy, (err, count) => {
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
            res.json(UserObjectService.convert(user));
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
        const docUpdate = {
            full_name: req.body.full_name,
        };

        /* if src_img is existed then update src_img */
        if (req.body.src_img) {
            docUpdate['src_img'] = req.body.src_img;
        }

        /* update user */
        return User.updateOne({ _id: req.body._id }, docUpdate)
            .then((data) => {
                console.log(data);
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
                UploadFileController.removeFile(req.body.src_img);
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
