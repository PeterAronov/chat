class FacebookLogin {
    constructor(appId, version) {
        this.appId = appId;
        this.version = version;
        this.accessToken = null;
    }

    static getUserNamePromiseWrapper() {    // we used this wrapper because FB.api does not support promises
        return new Promise((resolve, reject) => { // https://stackoverflow.com/questions/37104199/how-to-await-for-a-callback-to-return
            FB.api('/me', (response) => {
                if (response && !response.error) {
                    resolve(response.name)
                } else {
                    reject(response.error)
                }
            })
        })
    }

    static getUserName = async () => {
        console.log('Welcome!  Fetching your information.... ')

        try {
            const userName = await FacebookLogin.getUserNamePromiseWrapper()
            console.log('Successful login for: ' + userName)
            setLocalStorageUserName(userName)
            initChatMessagesAfterLogin()  // Init of the messages happens here because FB.api is an async function

            // return userName
        } catch (error) {
            console.log(error)
        }
    }

    static statusChangeCallback = async (response) => {
        console.log('statusChangeCallback');
        console.log()
        if (response.status === 'connected') {   // Logged into your webpage and Facebook. ('connected' / 'not_authorized' / 'unknown')
            console.log(response)
            await FacebookLogin.getUserName()
            this.accessToken = response.authResponse.accessToken;
            console.log(this.accessToken);
        }
        else if (response.status === 'not_authorized') {
            console.log('Please log into this app.')
            FB.logout((response) => document.location.reload())
        }
    }

    static getAcessTokenCallback = (response) => {
        if (response.status === 'connected') {   // Logged into your webpage and Facebook. ('connected' / 'not_authorized' / 'unknown')
            this.accessToken = response.authResponse.accessToken;
            console.log(this.accessToken);
        }
    }

    static checkLoginState() {             // Called when a person is finished with the Login Button. See the onlogin handler
        FB.getLoginStatus(FacebookLogin.statusChangeCallback) // getLoginStatus() is called with the callback function
    }

    static getAccessToken() {
        FB.getLoginStatus(FacebookLogin.getAcessTokenCallback)
    }

    static login_event = function (response) {
        console.log("login_event");
        console.log(response.status);
        console.log(response);
        const logoutButton = document.getElementById("logout-button")
        logoutButton.style.display = "none"
        const loginButton = document.getElementsByClassName('fb-login-button')[0]
        loginButton.style.display = "block"
        console.log(loginButton)
        console.log(logoutButton)
    }

    static logout_event = function (response) {
        console.log("logout_event");
        console.log(response.status);
        console.log(response);
        FB.logout(function(response) {
            location.reload();
        })
    }

    static logout() {
        FB.logout(function(response) {
            location.reload();
        })

        setLocalStorageUserName('undefined')
        const logoutButton = document.getElementById("logout-button")
        logoutButton.style.display = "block"
        const loginButton = document.getElementsByClassName('fb-login-button')[0]
        loginButton.style.display = "none"
        console.log(loginButton)
        console.log(logoutButton)
    }
    
    init = () => {
        FB.init({
            appId: this.appId,
            cookie: true,                     // Enable cookies to allow the server to access the session.
            xfbml: true,                     // Parse social plugins on this webpage.
            version: this.version           // Use this Graph API version for this call.
        });

        FacebookLogin.getAccessToken()
        const userName = getLocalStorageUserName()
        FB.Event.subscribe('auth.login', FacebookLogin.login_event)
        //FB.Event.subscribe('auth.logout', FacebookLogin.logout_event)

        if (userName !== 'undefined') {
            initChatMessagesAfterLogin()  // Init of the messages happens here because FB.api is an async function
        }
        else {
            const loginButton = document.getElementsByClassName('fb-login-button')[0]
            console.log(loginButton)
            loginButton.style.display = "block"
        }
    }
}

// https://chrome.google.com/webstore/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe
