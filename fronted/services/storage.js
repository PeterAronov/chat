class LocalStorageService {
    
    setUserName(name) {
        localStorage.setItem('userName', name)
    }

    getUserName() {
        return localStorage.getItem('userName')
    }
}

module.exports = new LocalStorageService()

