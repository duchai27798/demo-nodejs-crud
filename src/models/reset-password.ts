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
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('ResetPassword', resetPasswordSchema);
