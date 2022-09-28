const status = require('http-status');

const errorHandler = (err, req, res, next) => {
    console.log("Error handler: ", err);

    if (err.message === 'Message not found') {
        return res.status(status.NOT_FOUND).send({ error: err.message })
    } else if (err.message === 'Internal Server Error') {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ error: err.message })
    } else if (err.message === 'Invalid updates') {
        return res.status(status.BAD_REQUEST).send({ error: err.message })
    }
}

module.exports = errorHandler