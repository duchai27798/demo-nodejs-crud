/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import { mongoose } from '../utils/database-connection';

const resetPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expired_at: {
        type: Date,
        required: true,
        default: new Date(Date.now() + 60 * 60 * 1000),
    },
});

export default mongoose.model('ResetPassword', resetPasswordSchema);
