const express = require("express");
const actionDB = require("./actionModel");
const projectDB = require("./projectModel");
const router = express.Router();


//get all actions
router.get('/',(req,res)=>{

    actionDB.get(req.params.id)
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(error=>{
        console.log(error)
    })
})

//create action

router.post("/postAction",validateWithPostId,(req,res)=>{
actionDB.insert(req.body)
.then(success=>{
    res.status(201).json(success)
})
.catch()
})
//custom Middleware
function validateWithPostId(req,res,next){
    const postID = req.body.project_id;

    projectDB.get().then(users => {
      const result = users.find(({ id }) => id == postID);
      if (result) {
        next();
      } else {
        res.status(400).json({ message: "invalid product ID or product does not exist" });
      }
    });
    next();
}

module.exports = router;
