/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

export class UserObjectService {
    /**
     * transfer user data to user pattern
     * @param user
     * @returns {{full_name: any, is_active: any, _id: any, src_img: string, email: any}}
     */
    public static convert(user) {
        return {
            _id: user['_id'],
            email: user['email'],
            full_name: user['full_name'],
            src_img: `${user['src_img'] ? 'uploads/' + user['src_img'] : ''}`,
            is_active: user['is_active'],
        };
    }
}
