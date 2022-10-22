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
            // return userName
        } catch (error) {
            console.log(error)
        }
    }

    static statusChangeCallback = async (response) => {
        console.log('statusChangeCallback');
        console.log()
        if (response.status === 'connected') {   // Logged into your webpage and Facebook. ('connected' / 'not_authorized' / 'unknown')
            await FacebookLogin.getUserName()
            this.accessToken = response.authResponse.accessToken;
            console.log("Peter accessToken: " + this.accessToken + " + reload")
            location.reload()
        }
        else if (response.status === 'not_authorized') {
            console.log('Please log into this app.')
            FB.logout((response) => document.location.reload())
        }
    }

    static getAcessTokenCallback = (response) => {
        if (response.status === 'connected') {   // Logged into your webpage and Facebook. ('connected' / 'not_authorized' / 'unknown')
            this.accessToken = response.authResponse.accessToken;
        }
    }

    static checkLoginState() {             // Called when a person is finished with the Login Button. See the onlogin handler
        FB.getLoginStatus(FacebookLogin.statusChangeCallback) // getLoginStatus() is called with the callback function
    }

    static getAccessToken() {
        FB.getLoginStatus(FacebookLogin.getAcessTokenCallback)
    }

    static logout() {
        console.log("Peter logout 1, access token: " + this.accessToken)
        FB.logout(function(response) {
            console.log("Peter logout response + response.status: " + response.status)
            location.reload();
        })
        console.log("Peter logout 2")
        setLocalStorageUserName('undefined')
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

        if (userName !== 'undefined') {
            // const logoutButton = document.getElementById("logout")
            // logoutButton.style.display = "none"
            // const loginButton = document.getElementsByClassName('fb-login-button')[0]
            // loginButton.style.display = "block"
            initChatMessagesAfterLogin()  // Init of the messages happens here because FB.api is an async function
        }
        else {
            // const logoutButton = document.getElementById("logout")
            // logoutButton.style.display = "block"
            // const loginButton = document.getElementsByClassName('fb-login-button')[0]
            // loginButton.style.display = "none"
        }
    }
}

// https://chrome.google.com/webstore/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe
