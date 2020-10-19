/**
 *
 * @copyright Nitro Tech Asia Inc. 2020
 *
 * @summary []
 *
 * @author hainguyen <hainguyen27798@gmail.com>
 *
 */

import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
    },
});

/**
 * send email
 *
 * @param emailTo
 * @param subject: email title
 * @param htmlFile
 * @param data
 * @param callback: callback action
 */
export function sendEmail(emailTo, subject, htmlFile, data, callback = (err, info) => {}) {
    readEmailTemplate(`${__dirname}/../resources/email-template/${htmlFile}`, null, (err, html) => {
        const template = handlebars.compile(html);
        const htmlToSend = template(data);

        const mailOptions = {
            from: process.env.GMAIL_ADDRESS,
            to: emailTo,
            subject,
            html: htmlToSend,
        };

        /* send */
        transporter.sendMail(mailOptions, callback);
    });
}

function readEmailTemplate(path, data, callback: (err, html) => any) {
    fs.readFile(path, { encoding: 'utf-8' }, callback);
}
