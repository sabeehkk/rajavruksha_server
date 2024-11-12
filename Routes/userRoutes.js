const express = require("express")
const router = express.Router()
const usersController = require("../controlller/userController")

router.get("/careers",usersController.index);
// router.post("/careerForm",usersController.createNewForm);


module.exports = router;