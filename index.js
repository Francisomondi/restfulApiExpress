const Joi = require('joi');
const express = require("express");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const helmet = require("helmet");
const morgan = require("morgan");
const coursesRoute = require("./routes/courses");
const homeRoute = require("./routes/home");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(helmet());


if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("morgan enabled...")
}

//app.use(logger);
//app.use(auth);
app.use("/api/courses", coursesRoute);

app.use("/", homeRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));