class FacebookLogin {
    constructor(appId, version) {
        this.appId = appId;
        this.version = version;
    }

    async getUserName() {
        console.log('Welcome!  Fetching your information.... ')
        const response = FB.api('/me')
        console.log('Successful new login for: ' + response.name)
        setLocalStorageUserName(response.name)
        initChatMessagesAfterLogin()  // Init of the messages happens here because FB.api is an async function
    }

    static statusChangeCallback = (response) => {
        console.log('statusChangeCallback');

        if (response.status === 'connected') {   // Logged into your webpage and Facebook. ('connected' / 'not_authorized' / 'unknown')
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
    }
}