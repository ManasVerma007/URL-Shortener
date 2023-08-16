const express = require("express");
const app = express();
const path = require("path");
const PORT = 8001;
const URL = require("./models/url");
const { connectToMongoDB } = require("./connection.js");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDb connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`Server Satrted at PORT ${PORT}`);
});
