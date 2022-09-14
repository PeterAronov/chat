const mongoose = require('mongoose');
const validator = require('validator')
const { Schema } = mongoose

const messageSchema = new Schema({
    name: {
        type: String, // The type of the field is a string. Other types are: number, boolean, date, buffer, objectid, array and they will be rejected by the server.
        required: true,
        trim: true // Removes all the white spaces from the beginning and the end of the string.
    },
    text: {
        type: String,
        required: true,
        trim: true
    }
})

messageSchema.set('timestamps', true) // Adds createdAt and updatedAt fields to the schema.

const Message = mongoose.model('Message', messageSchema) // In the MongoDB under the database task-manager-api mongoose will create a collection called users(User inserted)


module.exports = Message