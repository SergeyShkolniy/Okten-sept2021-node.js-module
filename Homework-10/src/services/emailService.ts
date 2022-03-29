import nodemailer from 'nodemailer';
import { config } from '../config';
import { emailActionEnum, emailInfo } from '../email';

class EmailService {
    sendMail(userMail = '', action: emailActionEnum) {
        const { subject, html } = emailInfo[action];
        const emailTransporter = nodemailer.createTransport({
            from: 'node.js September 2021',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
