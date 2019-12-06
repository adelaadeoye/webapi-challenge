const express = require("express");
const actionDB = require("./actionModel");
const projectDB = require("./projectModel");
const router = express.Router();

//get project actions
router.get("/:id", (req, res) => {
  projectDB
    .getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
    });
});
// get all project

router.get("/", (req, res) => {
  projectDB
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
    });
});

// post project
router.post("/postProject",  (req, res) => {
  projectDB
    .insert(req.body)
    .then(success => {
      res.status(201).json(success);
    })
    .catch(error => {
      return res.status(500).json({ error: error.message });
    });
});

//custom Middleware

function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.originalUrl} at [${new Date().toISOString()}]`
  );

  next();
}

module.exports = router;
