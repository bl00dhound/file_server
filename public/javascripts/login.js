(() => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginBtn = document.getElementById('login_btn');

    loginBtn.addEventListener('click', () => {
        if (!username.value || !password.value) return;
        sendAutorizationForm(username.value, password.value);
    });





})();