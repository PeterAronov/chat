const getAllMessages = async () => {
    try {
        const response = await axios.get('/messages');
        displayAllMessages(response.data.messages);
    } catch (error) {
        console.error(error);
    }
}

const postMessage = async () => {
    const newMessage = {
        user_name: "Tom",
        text: "Relax"
    };

    try {
        const response = await axios.post('/messages/', newMessage);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

const deleteMessage = async (messageId) => {
    try {
        const response = await axios.delete('/messages/' + messageId);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

const displayAllMessages = (messages) => {
    const messagesNode = document.getElementById("messages-target");

    while (messagesNode.hasChildNodes()) {
        messagesNode.removeChild(messagesNode.lastChild);
    }

    messages.forEach((message) => {
        let divMessageContainer = document.createElement("div");
        let divMessageTime = document.createElement("div");
        let divMessageBody = document.createElement("div");
        divMessageContainer.className = 'message-container';
        divMessageTime.className = 'message-time';
        divMessageBody.className = 'message-body';
        const dateText = document.createTextNode(new Date(message.time).toLocaleString());
        const bodyText = document.createTextNode(message.user_name + ': ' + message.text);
        const IdText = document.createTextNode(message.id);
        divMessageTime.appendChild(dateText);
        divMessageBody.appendChild(bodyText);
        divMessageContainer.appendChild(divMessageTime);
        addDeleteButton(divMessageBody, message.id);
        divMessageContainer.appendChild(divMessageBody);
        messagesNode.append(divMessageContainer);
    });
}

const addDeleteButton = (divMessageContainer, messageId) => {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7"); /* \u00D7 stands for X */
    span.className = "deleteMessage";
    span.appendChild(txt);
    divMessageContainer.appendChild(span);// adds child to li
    span.onclick = () => { // writing deleteMessage(messageId) will call the CB immediately
        deleteMessage(messageId)
    };
}

setInterval(getAllMessages, 1000);
