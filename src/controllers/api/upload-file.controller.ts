/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import fs from 'fs';

export class UploadFileController {
    /**
     * upload single file and return file info
     * @param req
     * @param res
     */
    public static uploadFile(req, res) {
        res.json(req.file);
    }

    /**
     * remove image by filename
     * @param filename
     */
    public static removeFile(filename) {
        if (filename) {
            fs.unlink(`src/resources/uploads/${filename}`, (data) => {
                console.log(data);
            });
        }
    }
}
