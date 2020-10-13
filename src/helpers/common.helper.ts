/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */
import _ from 'lodash';

export const generateHelper = (app) => {
    app.locals.get = (obj, path = 'value') => {
        if (!!obj) {
            return _.get(obj, path);
        }
    }
}
