import { Checkservice } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from '../infrastructure/datasoruces/file-system.datasoruce';
import { envs } from "../config/plugins/envs.plugins";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log('Server started...');

        //TODO: Mandar email

        new SendEmailLogs(emailService, fileSystemLogRepository).execute([
            'emmanuelmosa@hotmail.com', 'sistemas7@skymeduza.com'
        ])

        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFilesSystemLogs([
        //     'emmanuelmosa@hotmail.com', 'sistemas7@skymeduza.com'
        // ])




        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {

        //         const url = 'https://google.com';


        //         new Checkservice(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)

        //             // undefined,
        //             // undefined

        //         ).execute(url);

        //     }
        // );

    }
}