const express = require("express");
const messagesController = require("../controllers/message");

const router = express.Router();

router.get("/messages/", messagesController.getAllMessages);

router.get("/messages/:id", messagesController.getSingelMessage);

router.post("/messages/", messagesController.createNewMessage);

router.patch("/messages/:id", messagesController.updateMessage);

router.delete("/messages/:id", messagesController.deleteMessage);

module.exports = router;