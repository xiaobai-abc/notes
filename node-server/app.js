const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const history = require('connect-history-api-fallback');
// const wsModule = require("./modules/ws");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const other = require("./routes/other");

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger("dev",{
//   ip : true
// }));
app.use(logger(':method :url :status :res[content-length] - :response-time ms - :remote-addr'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*"
  })
);

app.use("/json", express.static(path.join(__dirname, "json")));
app.use(express.static(path.join(__dirname, "public")));
// app.use(history());

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/api", other);

// wsModule.initWs();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// 处理所有路由，并返回 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
