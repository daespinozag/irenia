document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const adminContent = document.getElementById('admin-content');
    const errorMsg = document.getElementById('login-error');

    // Cambia estas credenciales por las tuyas
    const AUTH_USER = "irenia";
    const AUTH_PASS = "irenia2026";

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = document.getElementById('admin-user').value;
        const pass = document.getElementById('admin-pass').value;

        if (user === AUTH_USER && pass === AUTH_PASS) {
            loginScreen.classList.add('opacity-0');
            setTimeout(() => {
                loginScreen.classList.add('hidden');
                adminContent.classList.remove('hidden');
                adminContent.classList.add('animate-in', 'fade-in', 'duration-700');
            }, 300);
        } else {
            errorMsg.classList.remove('hidden');
            errorMsg.classList.add('shake');
            document.getElementById('admin-pass').value = "";
            setTimeout(() => errorMsg.classList.add('hidden'), 3000);
        }
    });
});
