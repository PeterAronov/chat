const express = require("express");
const { v4: uuidv4 } = require('uuid')// import single method(v4) from uuid library and call it uuidv4.[ else uuid = require('uuid')  => uuid.v4()]
const status = require('http-status');
const fs = require('fs');
const router = express.Router();

const currentMessagesJson = require("../../messages.json");
let currentMessagesTable = currentMessagesJson.messages;

/////////////GET////////////////////////////

router.get("/", (req, res) => { //http://localhost:8000/messages/
    return res.status(status.OK).json(currentMessagesJson);
});

router.get("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const id = req.params.id;
    const message = currentMessagesTable.filter((message) => message.id === id);

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
    //const id = parseInt(currentMessagesTable[currentMessagesTable.length - 1].id) + 1; // and then id: String(id)
    const newMessage = { text: req.body.text, id: uuidv4(), time: new Date().toLocaleString(), user_name: req.body.user_name }; // Make new const tweet and 
    currentMessagesTable.push(newMessage);

    saveUpdatedMessagesToJsonFile(req, res);
});

/////////////PUT////////////////////////////

router.put("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const id = req.params.id;
    const updatedMessageText = req.body.text;
    const index = currentMessagesTable.map((message) => message.id).indexOf(id);

    if (index !== -1) {
        currentMessagesTable[index].text = updatedMessageText;
        saveUpdatedMessagesToJsonFile(req, res);
    }
});

/////////////DELETE////////////////////////////

router.delete("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const id = req.params.id;
    const index = currentMessagesTable.map((message) => message.id).indexOf(id);
    if (index !== -1) {
        currentMessagesTable.splice(index, 1); // removes 1 element at the given index
        saveUpdatedMessagesToJsonFile(req, res);
    }
});

///////////////////////////////////////////////

function saveUpdatedMessagesToJsonFile(req, res) {
    const currentMessagesTableJson = { messages: currentMessagesTable }

    fs.writeFile("./messages.json", JSON.stringify(currentMessagesTableJson, null, 2), function (err) { //The path is relative to process.cwd()!
        if (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ failure: "writing to file was failed" });
        }
        return res.status(status.OK).json({ success: "writing to db completed with success" });
    })
};

///////////////////////////////////////////////

module.exports = router;// import and export router