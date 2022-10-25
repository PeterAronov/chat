const status = require('http-status');
const MessageService = require('../services/message');

const getAllMessages = async (req, res, next) => { //http://localhost:8000/messages/
    try {
        const messages = await MessageService.getAllMessages()
        res.status(status.OK).send(messages)
    } catch (error) {
        next(error)
    }
}

const getSingelMessage = async (req, res, next) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const { id: _id } = req.params;

    try {
        const message = await MessageService.getSingelMessage(_id)
        res.status(status.OK).send(message)
    } catch (error) {
        next(error)
    }
}

const createNewMessage = async (req, res, next) => { //http://localhost:8000/messages/
    const { text, name } = req.body;

    try {
        const message = await MessageService.createNewMessage(text, name)
        res.status(status.CREATED).send(message);
    } catch (error) {
        next(error)
    }
}

const updateMessage = async (req, res, next) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const updates = req.body
    const { id: _id } = req.params;
    try {
        const message = await MessageService.updateMessage(_id, updates)
        res.status(status.OK).send(message)
    } catch (error) {
        next(error)
    }
}

const deleteMessage = async (req, res, next) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const { id: _id } = req.params;

    try {
        const message = await MessageService.deleteMessage(_id)
        res.status(status.OK).send(message)
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllMessages,
    getSingelMessage,
    createNewMessage,
    updateMessage,
    deleteMessage
}