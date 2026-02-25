// apps/chat/auth.js

/**
 * 1. GUARDÍÁN DE SESIÓN
 * Verifica si el usuario ya tiene una sesión activa para redirigirlo.
 */
async function checkExistingSession() {
    if (typeof _supabase !== 'undefined') {
        const { data: { session } } = await _supabase.auth.getSession();
        
        // Si hay sesión y estamos en páginas de acceso, vamos al panel principal
        const isAuthPage = window.location.pathname.includes('login.html') || 
                           window.location.pathname.includes('register.html');
        
        if (session && isAuthPage) {
            window.location.href = "index.html";
        }
    }
}
checkExistingSession();

/**
 * 2. LÓGICA DE REGISTRO (register.html)
 */
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitBtn = e.target.querySelector('button');

        submitBtn.disabled = true;
        submitBtn.innerText = "Creando cuenta...";

        const { error } = await _supabase.auth.signUp({ email, password });

        if (error) {
            alert("Error en registro: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "Comenzar ahora";
        } else {
            alert("¡Registro iniciado! Por favor, confirma tu correo electrónico para activar tu cuenta.");
            window.location.href = "login.html";
        }
    });
}

/**
 * 3. LÓGICA DE INICIO DE SESIÓN (login.html)
 */
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitBtn = e.target.querySelector('button');

        submitBtn.disabled = true;
        submitBtn.innerText = "Validando...";

        const { error } = await _supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert("Acceso denegado: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "INGRESAR";
        } else {
            // Éxito: Vamos a la consola de voz
            window.location.href = "index.html";
        }
    });
}