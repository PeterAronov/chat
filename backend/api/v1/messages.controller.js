const status = require('http-status');
const Message = require('./message.model');

const getAllMessages = async (req, res) => { //http://localhost:8000/messages/
    try {
        const messages = await Message.find();
        res.status(status.OK).send(messages);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
}

const getSingelMessage = async (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const { id: _id } = req.params;

    try {
        const message = await Message.findById(_id);
        if (!message) {
            return res.status(status.NOT_FOUND).send()
        }

        res.status(status.OK).send(message)
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error)
    }
}

const createNewMessage = async (req, res) => { //http://localhost:8000/messages/
    const { text, name } = req.body;
    const newMessage = new Message({ text: text, name: name })

    try {
        const message = await newMessage.save();
        res.status(status.CREATED).send(message);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
};

const updateMessage = async (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const updates = Object.keys(req.body)  // keys returns an array of the keys of the object.
    const allowedUpdates = ['text', 'name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const { id: _id } = req.params;

    if (!isValidOperation) {
        return res.status(status.BAD_REQUEST).send({ error: 'Invalid updates!' })
    }

    try {
        const message = await Message.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!message) {
            return res.status(status.NOT_FOUND).send()
        }

        res.status(status.OK).send(message)
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error)
    }
}

const deleteMessage = async (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
    const { id: _id } = req.params;

    try {
        const message = await Message.findByIdAndDelete(_id);
        if (!message) {
            return res.status(status.NOT_FOUND).send()
        }

        res.status(status.OK).send(message)
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error)
    }
};

module.exports = {
    getAllMessages: getAllMessages,
    getSingelMessage: getSingelMessage,
    createNewMessage: createNewMessage,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage
}