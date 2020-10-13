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

export class HomeController {
    public static home = (req, res) => {
        User.find({}).then((users) => {
            const listUsers = users.map((user) => ({
                _id: user['_id'],
                full_name: user['full_name'],
                is_active: user['is_active'],
                email: user['email'],
            }));

            res.render('home', { listUsers });
        });
    };
}
