// here will be a function is authinticated, here will be called facebook service, index 
class LoginService {
    static isLoggedIn() {
        return localStorage.getItem('userName') !== 'undefined'
    }
}

module.exports = LoginService;

