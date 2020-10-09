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

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('user', userSchema);
