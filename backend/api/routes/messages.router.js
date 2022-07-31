const express = require("express");
const messagesController = require("../controllers/messages.controller");

const router = express.Router();

/////////////GET////////////////////////////

router.get("/", messagesController.getAllMessages);

router.get("/:id", messagesController.getSingelMessage);

/////////////POST////////////////////////////

router.post("/", messagesController.postNewMessage);

/////////////PUT////////////////////////////

router.put("/:id", messagesController.updateMessage);

/////////////DELETE////////////////////////////

router.delete("/:id", messagesController.deleteMessage);

///////////////////////////////////////////////

module.exports = router;// import and export router