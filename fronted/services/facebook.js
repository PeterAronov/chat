class FacebookLogin {
    constructor(appId, version) {
        this.appId = appId;
        this.version = version;
    }

    static getUserName() {
        console.log('Welcome!  Fetching your information.... ')
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name)
            setLocalStorageUserName(response.name)
            initChatMessagesAfterLogin()  // Init of the messages happens here because FB.api is an async function
        })
    }

    static statusChangeCallback = (response) => {
        console.log('statusChangeCallback');
        console.log(response);                   // The current login status of the person.
        if (response.status === 'connected') {   // Logged into your webpage and Facebook.
            FacebookLogin.getUserName()
        }
    }

    static checkLoginState() {             // Called when a person is finished with the Login Button. See the onlogin handler
        FB.getLoginStatus(FacebookLogin.statusChangeCallback) // getLoginStatus() is called with the callback function
    }

    init() {
        FB.init({
            appId: this.appId,
            cookie: true,                     // Enable cookies to allow the server to access the session.
            xfbml: true,                     // Parse social plugins on this webpage.
            version: this.version           // Use this Graph API version for this call.
        });

        console.log("facebook init (Peter Reomove this line)")
        FB.getLoginStatus(FacebookLogin.statusChangeCallback)   // Called after the JS SDK has been initialized. Returns the login status.
    }
}

module.exports = FacebookLogin