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
router.post("/postProject", (req, res) => {
  projectDB
    .insert(req.body)
    .then(success => {
      res.status(201).json(success);
    })
    .catch(error => {
      return res.status(500).json({ error: error.message });
    });
});

//Delete project

router.delete("/deleteProject/:id", async (req, res) => {
    const  projectID = req.params.id;
    try {

      const project = await projectDB.get(projectID);
      if (!project) {
        return res
          .status(400)
          .json({ message: "invalid project ID or project does not exist" });
      } else {
        projectDB.remove(req.params.id).then(success => {
          res.status(200).json({message:"Project deleted successfully"});
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  //update project
  router.put("/updateProject/:id", validateProjectID, (req, res) => {

    projectDB.update(req.params.id,req.body)
    .then(success=>{
        res.status(201).json({message:"project updated successfully ", success})
    })
    .catch(error=>{
        res.send(error)
    })
  
  });

//custom Middleware

function validateProjectID(req, res, next) {
    // do your magic!
    const projectID = req.params.id;
  
    projectDB.get().then(project => {
      const result = project.find(({ id }) => id == projectID);
      if (result) {
        next();
      } else {
        res.status(400).json({ message: "invalid project id" });
      }
    });
  }

module.exports = router;
