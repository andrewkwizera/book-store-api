const { createLogger, format, transports } = require('winston');
const config = require('../config/index')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'kigali-public-libary-api' },
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ]
});

//
// If we're in production logs just exceptions (errors)
//
if (config.env == 'production') {
    logger.add(new transports.File({ filename: 'exceptions.log', level: 'error' }),
    );
}


module.exports = logger