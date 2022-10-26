class MessageComponent {
    static createMessageElement(name, text, createdAt, messageId) {
        const messageElement = document.createElement("div");
        messageElement.className = "message-container";
        messageElement.innerHTML = `
            <div class="message-time">${new Date(createdAt).toLocaleString()}</div>
            <div class="message-body">${name}: ${text}
                <span class="deleteMessage" onclick="() => deleteMessage(${messageId})">×</span>
            </div>
        `;
        return messageElement;
    }
}

module.exports = MessageComponent;