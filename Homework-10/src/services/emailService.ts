import nodemailer from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from '../config';
import { emailActionEnum, emailInfo } from '../email';

class EmailService {
    templateRenderer = new EmailTemplate({
        views: {
            // @ts-ignore
            root: path.join(__dirname, '../', 'static'),
            options: {
                extension: 'hbs',
            },
        },
    });

    async sendMail(userMail = '', action: emailActionEnum) {
        const { subject, templateName } = emailInfo[action];
        const html = await this.templateRenderer.render(templateName);
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
