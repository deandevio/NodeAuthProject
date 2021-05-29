const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const DB_CONNECT = require("./config/db");
const { json } = require("express");

dotenv.config({ path: "config/config.env" });

const app = express();

DB_CONNECT();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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

app.use("/", require("./routes/routes"));

app.listen(5000, console.log(`App is running on port 5000`));
