import { format, createLogger, transports } from 'winston';

const { combine, timestamp, label, printf, colorize } = format;
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
    level:      'debug',
    format:     combine(label({ label: 'school API' }), timestamp(), colorize(), logFormat),
    transports: [ new transports.Console() ],
});

