// message service used to use API calls and talk to the server
// message component
// the problem here is that the code combines logic code with UI code

const getAllMessages = async () => {
    try {
        const response = await axios.get('/messages');
        displayAllMessages(response.data); // response.data is an array of object messages
    } catch (error) {
        console.error(error);
    }
}

const postMessage = async (messageText) => {
    const newMessage = {
        name: getLocalStorageUserName(),
        text: messageText
    };

    try {
        await axios.post('/messages/', newMessage);
    } catch (error) {
        console.log(error);
    }
}

const deleteMessage = async (messageId) => {
    console.log(messageId);
    try {
        await axios.delete('/messages/' + messageId);
    } catch (error) {
        console.log(error);
    }
}

const displayAllMessages = (messagesObjectArray) => {
    const messagesNode = document.getElementById("messages-target");

    while (messagesNode.hasChildNodes()) {
        messagesNode.removeChild(messagesNode.lastChild);
    }

    messagesObjectArray.forEach((message) => {

        let messageElement = `
        <div class="message-container">
        <div class="message-time">${new Date(message.createdAt).toLocaleString()}</div>
        <div class="message-body">${message.name}: ${message.text}
            <span class="deleteMessage" onclick={() => deleteMessage(${message._id})}>×</span>
        </div>
    </div>
    `
        messagesNode.insertAdjacentHTML("beforeend", messageElement);
    });
}

const addNewMessage = () => {
    const messageText = document.getElementById("new-message").value;

    if (messageText === "") {
        alert("Please enter a message");
        return;
    }

    postMessage(messageText);
    document.getElementById("new-message").value = "";
}