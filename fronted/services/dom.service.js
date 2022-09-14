initChatMessagesAfterLogin = () => {
    document.getElementsByClassName('message-container')[0].style.display = "block"; // getElementsByClassName returns an array of elements with the same class name
                                                                                     // "block" means that the element is displayed as a block element (like <p>) and not hidden                                                                
    const userName = getLocalStorageUserName()
    console.log(localStorage.getItem("userName"));
    const messageTextDiv = document.getElementById("new-message");
    messageTextDiv.placeholder = userName + " say something . . ."

    setInterval(getAllMessages, 500)
}
