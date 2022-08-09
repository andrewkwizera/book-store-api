const app = require('./app')
const logger= require('./config/logger')
const { connectMongo } = require("./db/mongo");

connectMongo()

const server = app.listen(app.get('port'), () => {

  logger.info(`${app.get('env')} server listening on port ${app.get('port')}`)
})

process.on('SIGTERM', () => {
  server.close(() => {
    logger.info('server terminated');
  });
});

