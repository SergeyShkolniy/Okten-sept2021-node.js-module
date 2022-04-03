import nodemailer from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from '../config';
import { EmailActionEnum, emailInfo } from '../email';

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

    async sendMail(userMail = '', action: EmailActionEnum, context = {}) {
        const { subject, templateName } = emailInfo[action];
        Object.assign(context);
        const html = await this.templateRenderer.render(templateName, context);

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
