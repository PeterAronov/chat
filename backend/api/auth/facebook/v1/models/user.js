// const Schema = require('mongoose').Schema;
// const validator = require('validator')

// const userSchema = new Schema({
//     profileId: {
//         type: String, // The type of the field is a string. Other types are: number, boolean, date, buffer, objectid, array and they will be rejected by the server.
//         required: true,
//         trim: true, // Removes all the white spaces from the beginning and the end of the string.
//         unique: true // The value of the field must be unique.
//     },
//     fullName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     profilePic: {
//         type: String,
//         required: true,
//         trim: true
//     }
// })

// userSchema.set('timestamps', true) // Adds createdAt and updatedAt fields to the schema.

// const User = mongoose.model('User', userSchema) // In the MongoDB under the database task-manager-api mongoose will create a collection called users(User inserted)

// module.exports = User