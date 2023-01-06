const express = require("express");
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const morgan = require('morgan')
let RedisStore = require("connect-redis")(session)


const config = require('./config/index')

const {connectRedis} = require('./db/redis')
const errorHandler = require("./api/middlewares/error");

const bookRouter = require("./api/routes/books");
const userRouter = require("./api/routes/users");
const baseRouter = require('./api/routes/base')

const app = express();

app.use(express.json());
app.use(morgan('combined'))

/* loads open API spec yaml files */
const swaggerDocument = YAML.load('api.yaml')


/* sets ups swagger */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



const redisClient = connectRedis()
redisClient.connect().then().catch(console.error)



app.use(
  session({
    secret: config.sessionSecret,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', baseRouter)

app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

app.set('port', config.port)
app.set('env', config.env)

module.exports = app



