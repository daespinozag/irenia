// apps/chat/auth.js

// 1. Verificación de Sesión (Guardián)
async function checkExistingSession() {
    if (typeof _supabase !== 'undefined') {
        const { data } = await _supabase.auth.getSession();
        // Si ya hay sesión y estamos en login/register, vamos al index
        if (data?.session && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
            window.location.href = "index.html";
        }
    }
}
checkExistingSession();

// 2. Lógica de Registro
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = e.target.querySelector('button');

        btn.disabled = true; btn.innerText = "Procesando...";

        const { error } = await _supabase.auth.signUp({ email, password });

        if (error) {
            alert("Error: " + error.message);
            btn.disabled = false; btn.innerText = "Comenzar ahora";
        } else {
            alert("¡Registro exitoso! Confirma tu correo para activar tu cuenta.");
            window.location.href = "login.html";
        }
    });
}

// 3. Lógica de Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = e.target.querySelector('button');

        btn.disabled = true; btn.innerText = "Entrando...";

        const { error } = await _supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert("Acceso denegado: " + error.message);
            btn.disabled = false; btn.innerText = "INGRESAR";
        } else {
            window.location.href = "index.html";
        }
    });
}