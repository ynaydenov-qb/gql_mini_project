import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";
import { env } from "./environment";

const logDir = path.join(__dirname, "logs");

// Check if the logs directory exists, otherwise create it
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define a format for JSON logs
const jsonFormat = format.combine(format.timestamp(), format.json());

export const logger = createLogger({
  level: "info",
  format: jsonFormat,
  transports: [
    // Using logs rotation technique
    new DailyRotateFile({
      // The file name is server-%DATE%.log, where %DATE% is replaced with the current date
      filename: path.join(logDir, "server-%DATE%.json"),
      // The logs are rotated daily
      datePattern: "YYYY-MM-DD",
      // The maximum size of a log file is set to 20 megabytes, after which a new log file is created
      maxSize: "20m",
      // Keep logs for the last 14 days, deleting the older ones automatically
      maxFiles: "14d",
      // Compress old logs to save space
      zippedArchive: true,
    }),
    ...(env.get("NODE_ENV") === "development"
      ? [new transports.Console({ format: jsonFormat })]
      : []),
  ],
});
