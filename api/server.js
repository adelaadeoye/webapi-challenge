const express = require("express");
const helmet = require("helmet");

const actionRouter = require("../data/helpers/actionRouter");
const projectRouter = require("../data/helpers/projectRouter");
const server = express();

server.use(express.json());
server.use("/api/actions", [ helmet(), logger, actionRouter]);
server.use("/api/projects", [ helmet(), logger, projectRouter]);
server.get("/", (req, res) => {
  res.send(`<h2>Web Api Friday Sprint Challenge</h2>`);
});




//custom middleware
function logger(req, res, next) {
    console.log(
      `${req.method} to ${req.originalUrl} at [${new Date().toISOString()}]`
    );
  
    next();
  }
  
  module.exports = server;
  