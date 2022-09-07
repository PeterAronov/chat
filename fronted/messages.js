let userName = "";

const getAllMessages = async () => {
    try {
        const response = await axios.get('/messages');
        displayAllMessages(response.data); // response.data is an array of object messages
    } catch (error) {
        console.error(error);
    }
}

const postMessage = async (userName, messageText) => {
    const newMessage = {
        name: userName,
        text: messageText
    };

    try {
        await axios.post('/messages/', newMessage);
    } catch (error) {
        console.log(error);
    }
}

const deleteMessage = async (messageId) => {
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
        let divMessageContainer = document.createElement("div");
        let divMessageTime = document.createElement("div");
        let divMessageBody = document.createElement("div");
        divMessageContainer.className = 'message-container';
        divMessageTime.className = 'message-time';
        divMessageBody.className = 'message-body';
        const dateText = document.createTextNode(new Date(message.createdAt).toLocaleString());
        const bodyText = document.createTextNode(message.name + ': ' + message.text);
        const IdText = document.createTextNode(message._id);
        divMessageTime.appendChild(dateText);
        divMessageBody.appendChild(bodyText);
        addDeleteButton(divMessageBody, message._id);
        divMessageContainer.appendChild(divMessageTime);
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
    span.onclick = () => deleteMessage(messageId) // writing deleteMessage(messageId) will call the CB immediately
}

const userLogin = () => {
    const user = document.getElementById("user-name").value;

    if (user === "") {
        alert("Please enter a user name");
        return;
    }
    userName = user;
    const loginDiv = document.getElementById("login-chat");
    loginDiv.style.display = "none";
    document.getElementsByClassName('message-container')[0].style.display = "block"; // getElementsByClassName returns an array of elements with the same class name

    const messageTextDiv = document.getElementById("new-message");
    messageTextDiv.placeholder = userName + " Say something . . ."

    setInterval(getAllMessages, 500);
}

const addNewMessage = () => {
    const messageText = document.getElementById("new-message").value;

    if (messageText === "") {
        alert("Please enter a message");
        return;
    }

    postMessage(userName, messageText);
    document.getElementById("new-message").value = "";
}