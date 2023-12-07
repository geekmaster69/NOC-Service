
import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";




interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    finename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,

        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SCRET_KEY
        }
    });

    constructor(
        
    ) { }


    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sendInformation = await this.transporter.sendMail({


                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

    
            return true;

        } catch (error) {
           

            return false;

        }

    }

    async sendEmailWithFilesSystemLogs(to: string | string[]) {
        const subject = 'Logs de servidor';
        const htmlBody = `

        <h3>Logs de sistema -NOC</h3>
        <p>Elit cupidatat incididunt do dolor dolore magna dolore. </p>
        <p> Ver logs adjuntos</p>
        
        `;
        const attachments: Attachment[] = [
            { finename: 'logs-all.log', path: './logs/logs-all.log' },
            { finename: 'logs-high.log', path: './logs/logs-high.log' },
            { finename: 'logs-medium.log', path: './logs/logs-medium.log' },

        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });

    }





}