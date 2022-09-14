let userName = "";

const facebookLogin = new FacebookLogin('614397593554229', 'v14.0')
facebookLogin.init()

const userLogin = () => {

    // This part should be deprecated
    
    const user = document.getElementById("user-name").value;

    if (user === "") {
        alert("Please enter a user name");
        return;
    }
    userName = user;
    const loginDiv = document.getElementById("login-chat");
    loginDiv.style.display = "none";

    // This part is relevant for the chat

    document.getElementsByClassName('message-container')[0].style.display = "block"; // getElementsByClassName returns an array of elements with the same class name
                                                                                 // "block" means that the element is displayed as a block element (like <p>) and not hidden                                                                
    const messageTextDiv = document.getElementById("new-message");
    messageTextDiv.placeholder = userName + " Say something . . ."

    setInterval(getAllMessages, 500);
}

