const express = require("express")
const router = express.Router()
const usersController = require("../controlller/userController")

router.post('/savecontact',usersController.contactMail)


module.exports = router;  