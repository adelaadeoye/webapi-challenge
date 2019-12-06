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


router.delete("/deleteProject/:id", async (req, res) => {
    const  projectID = req.params.id;
    try {

      const action = await projectDB.get(projectID);
      if (!action) {
        return res
          .status(400)
          .json({ message: "invalid project ID or projrct does not exist" });
      } else {
        projectDB.remove(req.params.id).then(success => {
          res.status(200).json({message:"Project deleted successfully"});
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });


//custom Middleware

function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.originalUrl} at [${new Date().toISOString()}]`
  );

  next();
}

module.exports = router;
