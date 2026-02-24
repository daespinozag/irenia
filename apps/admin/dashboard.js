document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const adminContent = document.getElementById('admin-content');
    const errorMsg = document.getElementById('login-error');

    // Configuración temporal (Cámbiala por algo seguro)
    const AUTH = {
        user: "admin",
        pass: "Irenia2026!" 
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userInput = document.getElementById('admin-user').value;
        const passInput = document.getElementById('admin-pass').value;

        if (userInput === AUTH.user && passInput === AUTH.pass) {
            // Éxito: Ocultar login y mostrar dashboard
            loginScreen.classList.add('hidden');
            adminContent.classList.remove('hidden');
            console.log("Acceso concedido. Bienvenido, Admin.");
        } else {
            // Error
            errorMsg.classList.remove('hidden');
            document.getElementById('admin-pass').value = "";
            setTimeout(() => errorMsg.classList.add('hidden'), 3000);
        }
    });
});
