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
              const baseLog = `${timestamp} [${level}]: ${message}`; // Example: 2024-07-12T12:34:56.789Z [info]: Message
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

    // Override the default console log format to include full error details
    const consoleFormat = format.printf(
      ({ level, message, timestamp, stack, ...info }) => {
        let logMessage = `${timestamp} [${level}]: ${message}`;
        if (stack) {
          logMessage += `\n${stack}`;
        }
        if (Object.keys(info).length > 0) {
          logMessage += `\n${JSON.stringify(info, null, 2)}`;
        }
        return logMessage;
      }
    );

    // Apply the new format to the console transport
    this.logger.transports[0].format = format.combine(
      format.timestamp(),
      format.colorize(),
      consoleFormat
    );
  }
}

const logger = new Logger().logger;
export default logger;
