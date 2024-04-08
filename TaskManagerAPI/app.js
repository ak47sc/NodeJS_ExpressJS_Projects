const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/error-handler");
const notFound = require('./middleware/not-found')
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server Listening in Port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
