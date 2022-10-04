class Login {
    constructor() {
        this.login = document.getElementById('login')
        this.login.addEventListener('click', () => this.login())
    }

    login() {
        console.log('login')
    }
}