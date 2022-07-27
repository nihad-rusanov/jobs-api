const express = require("express");
const { connectDatabse } = require("./db/db");
const errorHandler = require("./middilewares/err-handler");
const not_found = require("./middilewares/not-found");
const auth = require("./routes/auth");
const job = require("./routes/jobs");
const authenticateUser = require("./middilewares/authentication");
const app = express();

app.use(express.json());

app.use("/api/v1/job", authenticateUser, job);
app.use("/api/v1/auth", auth);

connectDatabse();

app.use(errorHandler);
app.use(not_found);
const PORT = 3000;

app.listen(PORT, () => {
  console.log("port is running ...");
});
