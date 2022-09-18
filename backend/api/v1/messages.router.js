const express = require("express");
const messagesController = require("./messages.controller");

const router = express.Router();

router.get("/", messagesController.getAllMessages);

router.get("/:id", messagesController.getSingelMessage);

router.post("/", messagesController.createNewMessage);

router.patch("/:id", messagesController.updateMessage);

router.delete("/:id", messagesController.deleteMessage);

module.exports = router;