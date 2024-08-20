import { createLogger, format, transports } from "winston";
import path from "path";

const logPath = path.join(__dirname, "logs", "server.log");

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.File({
            filename: logPath
        })
    ]
});