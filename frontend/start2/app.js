/* eslint-disable */
const express = require("express");
const path = require("path");
const app = express();

const port = 5002

const http = require("http").createServer(app);
http.listen(port, function () {
  console.log("listening on " + port);
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});