const express = require("express");
const session = require('express-session');
cookieParser = require('cookie-parser');
require("dotenv").config();


const { connectToDb } = require("./utils/db");
const errorHandler = require('./middlewares/error')
const responseDuration = require('./middlewares/responseDuration')

const bookRouter = require("./routes/books");
const userRouter = require('./routes/users')
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 10000,
      httpOnly:false
    }
  }),)

app.use(responseDuration)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)

app.use(errorHandler);

connectToDb();

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
