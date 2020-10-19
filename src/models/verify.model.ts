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

const verifySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    expired_at: {
        type: Date,
        default: new Date(Date.now() + 10 * 60 * 1000),
        required: true,
    },
});

export default mongoose.model('Verify', verifySchema);
