const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo')


const config = require('./config/index')
const { connectToDb } = require("./config/db");
const errorHandler = require("./middlewares/error");
const responseDuration = require("./middlewares/responseDuration");

const bookRouter = require("./routes/books");
const userRouter = require("./routes/users");
const app = express();

app.use(express.json());

const store = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017",
  dbName:'session',
  ttl: 24 * 60 * 60,
  stringify: false,
});
connectToDb();


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: "server running",
  });
});

app.use(
  session({
    secret: "my-secret",
    store:store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 10000,
      httpOnly: true,
    },
  })
);

app.use(responseDuration);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

app.set('port', config.port)
app.set('env', config.env)

module.exports = app



