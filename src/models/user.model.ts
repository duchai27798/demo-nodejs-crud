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
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
    },
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
    src_img: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('User', userSchema);
