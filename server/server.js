const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const routes = require("./routes");

const passport = require("passport");
const { jwtStrategy } = require("./middleware/passport");

const { handleError, convertToApiError } = require("./middleware/apiError");

// connect to database
mongoose.connect(process.env.DB_URI);

// PARSING
app.use(cookieParser());
app.use(bodyParser.json());

// CORS
app.use(cors());

// SANITIZATION
app.use(xss());
app.use(mongoSanitize());

// PASSPORT
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// ROUTES
app.use("/api", routes);
app.get("/setcookie", (req, res) => {
  res.cookie("test-cookie", "Hello World").send("cookie set");
});

// ERROR HANDLING
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
