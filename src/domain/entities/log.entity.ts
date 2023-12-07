
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: String;

    constructor(options: LogEntityOptions) {
        const { level, message, createdAt = new Date(), origin } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;

    }


    static fromJson = (json: string): LogEntity => {

        const { message, level, createdAt, origin } = JSON.parse(json);

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });

        log.createdAt = new Date(createdAt);

        return log;

    }
}