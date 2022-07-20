const express = require("express");
require("dotenv").config();


const { connectToDb } = require("./utils/db");
const errorHandler = require('./middlewares/error')
const responseDuration = require('./middlewares/responseDuration')

const bookRouter = require("./routes/books");

const app = express();

app.use(express.json());

app.use(responseDuration)
app.use('/api/v1/books', bookRouter)

app.use(errorHandler);

connectToDb();

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
