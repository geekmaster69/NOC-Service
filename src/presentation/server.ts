import { Checkservice } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {

    public static start() {
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // new Checkservice().execute('http://localhost:3000');
                const url = 'https://google.com';


                new Checkservice(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)

                ).execute(url);

            }
        );

    }
}