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

export function convertFormatErrors(data, errors) {
    const errorObject = {};

    /* Transform errors array to object with key is field name */
    errors.forEach((field) => {
        errorObject[field.param] = errorObject[field.param] || field;
    });

    if (!_.isEmpty(errors)) {
        const contentObject = {};

        /* put error into the corresponding field  */
        _.forEach(_.keys(data), (field) => {
            contentObject[field] = {
                value: _.get(data, `${field}`),
            };

            if (errorObject[field]) {
                contentObject[field]['msg'] = errorObject[field].msg;
            }
        });

        return contentObject;
    }

    return null;
}
