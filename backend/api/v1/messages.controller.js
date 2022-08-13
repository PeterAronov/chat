const { v4: uuidv4 } = require('uuid');
const status = require('http-status');
const messagesFileService = require('./messages.file.service');
const messagesJson = require("../../messages.json");

let messages = messagesJson.messages;
const messagesJsonPath = process.env.MESSAGES_JSON_PATH;

const getAllMessages = (req, res) => { //http://localhost:8000/messages/
    return res.status(status.OK).json(messagesJson)
};

const getSingelMessage = (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const { id } = req.params;
    const message = messages.filter((message) => message.id === id);

    if (message.length === 0) {
        return res.status(status.NOT_FOUND).json({ failure: "Message ID wasn't found. Getting was failed" });
    } else if (message.length > 1) {
        return res.status(status.INTERNAL_SERVER_ERROR).send()
    } else {
        return res.status(status.OK).json({
            message: message[0]
        });
    }
};

const createNewMessage = (req, res) => { //http://localhost:8000/messages/
    const { text, user_name } = req.body;

    const newMessage = { text, id: uuidv4(), time: new Date().toLocaleString(), user_name };
    messages.push(newMessage);

    messagesFileService.writeMessagesToJsonFile(res, messages, messagesJsonPath, status.CREATED);
};

const updateMessage = (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const { id } = req.params;
    const { text: newText } = req.body;
    const message = messages.find((message) => message.id === id);

    if (message === undefined) {
        return res.status(status.NOT_FOUND).json({ failure: "Message ID wasn't found. Updating was failed" });
    } else {
        const index = messages.findIndex((message) => message.id === id);
        messages[index].text = newText;
        messagesFileService.writeMessagesToJsonFile(res, messages, messagesJsonPath, status.OK);
    }
};

const deleteMessage = (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const { id } = req.params;
    const message = messages.find((message) => message.id === id);

    if (message === undefined) {
        return res.status(status.NOT_FOUND).json({ failure: "Message ID wasn't found. Deleting was failed" });
    } else {
        const index = messages.findIndex((message) => message.id === id);
        messages.splice(index, 1);
        messagesFileService.writeMessagesToJsonFile(res, messages, messagesJsonPath, status.OK);
    }
};

module.exports = {
    getAllMessages: getAllMessages,
    getSingelMessage: getSingelMessage,
    createNewMessage: createNewMessage,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage
}