const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const DB_CONNECT = require("./config/db");
const app = express();

// Load env vars
dotenv.config({ path: "config/config.env" });

// Connect to DB
DB_CONNECT();

// Set ejs
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
    }),
  })
);

// Mounted routes
app.use("/", require("./routes/routes"));

// Server init
app.listen(5000, console.log(`App is running on port 5000`));
