const express = require("express");
const { v4: uuidv4 } = require('uuid')// import single method(v4) from uuid library and call it uuidv4.[ else uuid = require('uuid')  => uuid.v4()]
const status = require('http-status');
const messagesManager = require('./messages_manager');
const messagesJson = require("../../messages.json");

const router = express.Router();
let messages = messagesJson.messages;
const messagesJsonPath = process.env.MESSAGES_JSON_PATH;

/////////////GET////////////////////////////

router.get("/", (req, res) => { //http://localhost:8000/messages/
    return res.status(status.OK).json(messagesJson);
});

router.get("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const id = req.params.id;
    const message = messages.filter((message) => message.id === id);

    if (message.length === 0) {
        return res.status(status.NOT_FOUND).send()
    } else if (message.length > 1) {
        return res.status(status.INTERNAL_SERVER_ERROR).send()
    } else {
        return res.status(status.OK).json({
            message: message[0]
        });
    }
});

/////////////POST////////////////////////////

router.post("/", (req, res) => { //http://localhost:8000/messages/
    const newMessage = { text: req.body.text, id: uuidv4(), time: new Date().toLocaleString(), user_name: req.body.user_name }; // Make new const tweet and 
    messages.push(newMessage);

    messagesManager.writeMessagesToJsonFile(res, messages, messagesJsonPath);
});

/////////////PUT////////////////////////////

router.put("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const id = req.params.id;
    const updatedMessageText = req.body.text;
    const index = messages.map((message) => message.id).indexOf(id);

    if (index !== -1) {
        messages[index].text = updatedMessageText;
        messagesManager.writeMessagesToJsonFile(res, messages, messagesJsonPath);
    }
    console.log(messages);
});

/////////////DELETE////////////////////////////

router.delete("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const id = req.params.id;
    const index = messages.map((message) => message.id).indexOf(id);
    if (index !== -1) {
        messages.splice(index, 1); // removes 1 element at the given index
        messagesManager.writeMessagesToJsonFile(res, messages, messagesJsonPath);
    }
});

///////////////////////////////////////////////

module.exports = router;// import and export router