const path = require("path");

const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const createSessionConfig = require("./config/session");
const db = require("./data/database");
const addCSRFTokenMiddleware = require("./middleware/csrf-token");
const errorHandlerMiddleware = require("./middleware/error-handler");
const checkAuthStatusMiddleware = require("./middleware/check-auth");
const authRoutes = require("./routes/auth-routes");
const beatsRoutes = require("./routes/beats-routes");
const baseRoutes = require("./routes/base-routes");
const adminRoutes = require('./routes/admin-routes')

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use('/beats/assets' ,express.static("beat-data"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCSRFTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(beatsRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database!");
    console.log(error);
  });
