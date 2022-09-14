initChatMessagesAfterLogin = () => {
    document.getElementsByClassName('message-container')[0].style.display = "block"; // getElementsByClassName returns an array of elements with the same class name
                                                                                     // "block" means that the element is displayed as a block element (like <p>) and not hidden                                                                
    const messageTextDiv = document.getElementById("new-message");
    messageTextDiv.placeholder = userName + " Say something . . ."

    setInterval(getAllMessages, 500)
}
