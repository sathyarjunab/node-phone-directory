import winston from "winston";
class Logger {
  constructor() {
    this.logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.printf(
            ({ level, message, timestamp }) =>
              `${timestamp} [${level}]: ${message}`
          )
        ),
      })
    );
  }

  logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  });
}

export default new Logger().logger;
