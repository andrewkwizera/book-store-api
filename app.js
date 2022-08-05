const express = require("express");
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const morgan = require('morgan')
let RedisStore = require("connect-redis")(session)


const config = require('./config/index')
const { connectMongo } = require("./db/mongo");
const {connectRedis} = require('./db/redis')
const errorHandler = require("./middlewares/error");

const bookRouter = require("./routes/books");
const userRouter = require("./routes/users");
/** These route conatins the health routes */
const baseRouter = require('./routes/base')
const app = express();

app.use(express.json());
app.use(morgan('combined'))

/* loads open API spec yaml files */
const swaggerDocument = YAML.load('api.yaml')


/* sets ups swagger */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


connectMongo();
const redisClient = connectRedis()
redisClient.connect().then().catch(console.error)



app.use(
  session({
    secret: "my-secret",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

app.set('port', config.port)
app.set('env', config.env)

module.exports = app



