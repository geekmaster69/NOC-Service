import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckserviceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;



export class Checkservice implements CheckserviceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback

    ) { }


    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            // const log = new LogEntity(`Service ${url} is working`, LogSeverityLevel.low);
            const log = new LogEntity({
                message: `Service ${url} is working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);

            this.successCallback && this.successCallback();  // Si el primero es falso o undefine no ejecuta la segunda parte
            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `Service ${url} is not ok ${error}`,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);

            this.errorCallback && this.errorCallback(`${error}`);  // Si el primero es falso o undefine no ejecuta la segunda parte

            return false
        }
    }
}