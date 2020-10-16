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
 * @param text: email content
 * @param callback: callback action
 */
export function sendEmail(emailTo, subject, text, callback = (err, info) => {}) {
    const mailOptions = {
        from: process.env.GMAIL_ADDRESS,
        to: emailTo,
        subject,
        text,
    };

    /* send */
    transporter.sendMail(mailOptions, callback);
}
