const express = require("express");
const actionDB = require("./actionModel");
const projectDB = require("./projectModel");
const router = express.Router();

//get all actions
router.get("/", (req, res) => {
  actionDB
    .get(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
    });
});

//create action

router.post("/postAction", async (req, res) => {
  const { project_id } = req.body;
  try {
    const project = await projectDB.get(project_id);
    if (!project) {
      return res
        .status(400)
        .json({ message: "invalid Project ID or Project does not exist" });
    } else {
      actionDB.insert(req.body).then(success => {
        res.status(201).json(success);
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Delete action

// router.delete("/deleteAction/:id",  (req, res) => {
//   actionDB
//     .remove(req.params.id)
//     .then(deleteSuccess => {
//       res
//         .status(200)
//         .json({ message: "Item deleted successfully", deleteSuccess });
//     })
//     .catch(error => {
//       res.status(500).json({ error: error.message });
//     });
// });
router.delete("/deleteAction/:id", async (req, res) => {
    const  actionId = req.params.id;
    try {

      const action = await actionDB.get(actionId);
      if (!action) {
        return res
          .status(400)
          .json({ message: "invalid action ID or action does not exist" });
      } else {
        actionDB.remove(req.params.id).then(success => {
          res.status(200).json({message:"item deleted successfully"});
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
//custom Middleware
function validateAcionID(req, res, next) {
  const actionId = req.params.id;

  actionDB.get().then(users => {
    const result = users.find(({ id }) => id == actionId);
    if (result) {
      next();
    } else {
      res.status(400).json({ message: "invalid  ID or action does not exist" });
    }
  });
  next();
}

module.exports = router;
