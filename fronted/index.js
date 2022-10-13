// needs to have a router that can load login facebook page or chat page
// if not authenticated, then load login page else load chat page




const facebookLogin = new FacebookLogin('614397593554229', 'v14.0')
await facebookLogin.init()
 