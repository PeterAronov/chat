const Message = require('../models/message');

class MessageService {
    static async getAllMessages() {
        try {
            const messages = await Message.find()
            return messages;
        } catch (error) {
            throw new Error("Internal Server Error")
        }
    }

    static async getSingelMessage(_id) {
        try {
            const message = await Message.findById(_id)

            if (!message) {
                throw new Error("Message not found")
            }

            return message
        } catch (error) {
            if (error.message !== "Message not found") {
                throw new Error("Internal Server Error")
            } else {
                throw new Error("Message not found")
            }
        }
    }

    static async createNewMessage(text, name) {
        const newMessage = new Message({ text: text, name: name })

        try {
            const message = await newMessage.save()
            return message;
        } catch (error) {
            throw new Error("Internal Server Error")
        }
    }

    static async updateMessage(_id, updates) {
        const allowedUpdates = ['text', 'name']
        const keysToUpdate = Object.keys(updates)  // keys returns an array of the keys of the object.
        const isValidOperation = keysToUpdate.every((update) => allowedUpdates.includes(update))
        
        if (!isValidOperation) {
            throw new Error("Invalid updates")
        }

        try {
            const message = await Message.findByIdAndUpdate(_id, updates, { new: true, runValidators: true })

            if (!message) {
                throw new Error("Message not found")
            }

            return message
        } catch (error) {
            if (error.message === "Message not found") {
                throw new Error("Message not found")
            } else if (error.message === "Invalid updates") {
                throw new Error("Invalid updates")
            } else { 
                throw new Error("Internal Server Error")
            }
        }
    }

    static async deleteMessage(_id) {
        try {
            const message = await Message.findByIdAndDelete(_id)

            if (!message) {
                throw new Error("Message not found")
            }

            return message
        } catch (error) {
            if (error.message !== "Message not found") {
                throw new Error("Internal Server Error")
            } else {
                throw new Error("Message not found")
            }
        }
    }
}

module.exports = MessageService;