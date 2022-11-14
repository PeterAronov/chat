// shows list of an array of message components

// 1 - chat page runs
// 2 - using chat service to talk with the server
// 3 - using message component to show one message and so on for the rest of the messages ( we use an iterator to loop through the array of messages)

class ChatPage {
    static DisplayChatPage = async () => {
        const messages = await MessageService.getAllMessages();
        const messagesNode = document.getElementById("messages-target");

        while (messagesNode.hasChildNodes()) {
            messagesNode.removeChild(messagesNode.lastChild);
        }

        messages.forEach((message) => {
            const messageElement = MessageComponent.createMessageElement(message.name, message.text, message.createdAt, message._id)
            messagesNode.insertAdjacentHTML("beforeend", messageElement);
        });
    }
}