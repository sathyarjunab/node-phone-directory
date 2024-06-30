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
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.errors({ stack: true }),
            format.printf(
              ({ level, message, timestamp, stack }) =>
                `${timestamp} [${level}]: ${stack || message}` //2024-06-15T18:04:39.381Z [info]: CONNECTED
            )
          ),
        }),
      ],
    });
  }
}

const logger = new Logger().logger;
export default logger;

// import winston from "winston";

// class Logger {
//   constructor() {
//     this.logger.add(
//       new winston.transports.Console({
//         format: winston.format.combine(
//           winston.format.timestamp(),
//           winston.format.colorize(),
//           winston.format.printf(
//             ({ level, message, timestamp }) =>
//               `${timestamp} [${level}]: ${message}` //2024-06-15T18:04:39.381Z [info]: CONNECTED
//           )
//         ),
//       })
//     );
//   }

//   logger = winston.createLogger({
//     level: "info",
//     format: winston.format.combine(
//       winston.format.timestamp(),
//       winston.format.json()
//     ),
//   });
// }
// const logger = new Logger().logger;
// export default logger;
