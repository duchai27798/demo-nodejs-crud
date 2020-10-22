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

const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Product', productSchema);
