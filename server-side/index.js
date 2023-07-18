const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config();
const quizRouter = require("./Routes/quizRoute");

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan(":method :url")); // displaying urls and which Method was being entered .
app.use(cors()); // allow request from any origin .

app.listen(port, () => console.log(`Quiz app listening on port ${port}!`));

app.use(express.json()); // parsing all requests to JSON
app.use(quizRouter);

app.use((req, res) => res.status(404).json({ massage: "not found" }));
