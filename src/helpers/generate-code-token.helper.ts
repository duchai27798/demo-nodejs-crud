/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

/**
 * generate code token from alphabet and number
 *
 * @param length: token length
 * @return {string}
 * */
export function generateCodeToken(length = 6) {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characterLength = character.length;
    let result = '';

    for (let i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * characterLength));
    }

    return result;
}
