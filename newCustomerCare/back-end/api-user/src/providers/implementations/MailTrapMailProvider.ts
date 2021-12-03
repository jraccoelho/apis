import { IMailProvider, IMessage } from '../IMailProvider';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailTrapMailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "eff7b533768da6",
              pass: "818da0f3190ae9"
            }
        })
    }
    async send(message : IMessage) : Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.email,
                address: message.from.email
            },
            //TODO: Review how to implement optional values in this JSON
            subject: message.subject,
            html: message.body
        });
    }
}