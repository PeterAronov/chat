class LocalStorageService {
    constructor(userName) {
        this.userName = userName;
    }

    setUserName(userName) {
        //localStorage.setItem('userName', userName)
        this.userName = userName;
    }

    getUserName() {
        //return localStorage.getItem('userName')
        return this.userName
    }
}

module.exports = LocalStorageService

