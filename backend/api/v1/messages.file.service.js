
const fs = require('fs');
const status = require('http-status');

const writeMessagesToJsonFile = (res, messages, path, statusCode) => {
    const messagesJson = { messages: messages }

    // if(res === null) {
    //     fs.writeFile(path, JSON.stringify(messagesJson, null, 2), err => {
    //         if(err) {
    //             console.error(err);
    //         }
    //     });

    //     return;
    // }

    fs.writeFile(path, JSON.stringify(messagesJson, null, 2), err => { //The path is relative to process.cwd()!
        if (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ failure: "writing to file was failed" });
        }
        return res.status(statusCode).json({ success: "writing to db completed with success: " + statusCode });
    })
};

module.exports.writeMessagesToJsonFile = writeMessagesToJsonFile;