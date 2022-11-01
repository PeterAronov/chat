class MessageComponent {
    static createMessageElement(name, text, createdAt, messageId) {
        let messageElement = `
        <div class="message-container">
        <div class="message-time">${new Date(createdAt).toLocaleString()}</div>
        <div class="message-body">${name}: ${text}
            <span class="deleteMessage" onclick="deleteMessage('${messageId}')">×</span>
        </div>
    </div>
    `
        return messageElement;
    }

    static addNewMessage() {
        const messageText = document.getElementById("new-message").value;
    
        if (messageText === "") {
            alert("Please enter a message");
            return;
        }
    
        MessageService.postMessage(messageText);
        document.getElementById("new-message").value = "";
    }
}