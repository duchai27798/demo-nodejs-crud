/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// set up mongoose
mongoose
    .connect(process.env.MONGO_STR_CONNECTON, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });

export { mongoose };