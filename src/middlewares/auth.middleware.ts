/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */
export function checkAuth(req, res, next) {
    if (req.cookies.auth) {
        return next();
    }

    return res.redirect('/login');
}
