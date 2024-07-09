import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";

class Logger {
  public logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.printf(({ level, message, timestamp, stack, ...meta }) => {
              const baseLog = `${timestamp} [${level}]: ${message}`; //2024-06-15T18:04:39.381Z [info]: CONNECTED
              const stackLog = stack ? `\n${stack}` : "";
              const metaLog = Object.keys(meta).length
                ? `\n${JSON.stringify(meta, null, 2)}`
                : "";
              return `${baseLog}${stackLog}${metaLog}`;
            })
          ),
        }),
      ],
    });
  }
}

const logger = new Logger().logger;
export default logger;
