import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

    static createJob(cronTIme: CronTime, onTick: OnTick): CronJob {

        const job = new CronJob(cronTIme, onTick);

        job.start();

        return job;

    }
}