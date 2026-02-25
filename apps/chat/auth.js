// 1. Configuración de Supabase
const SUPABASE_URL = 'https://ttymwhkhwwgljuguxeia.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // (Tu clave completa)

// 2. Inicialización corregida
// Usamos 'supabase.createClient' porque la librería global se llama 'supabase'
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 3. Verificación Automática: Si ya está logueado, mandarlo al chat
async function checkExistingSession() {
    const { data } = await _supabase.auth.getSession();
    if (data.session) {
        window.location.href = "index.html";
    }
}
checkExistingSession();

// 4. Manejo de Registro
const registerForm = document.getElementById('register-form');
if(registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitBtn = e.target.querySelector('button');

        submitBtn.disabled = true;
        submitBtn.innerText = "Procesando...";

        const { data, error } = await _supabase.auth.signUp({ 
            email, 
            password,
            options: {
                emailRedirectTo: window.location.origin + '/apps/chat/login.html'
            }
        });

        if (error) {
            alert("Error: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "Comenzar ahora";
        } else {
            alert("¡Registro iniciado! Por favor, revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.");
            window.location.href = "login.html";
        }
    });
}

// 5. Manejo de Login
const loginForm = document.getElementById('login-form');
if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitBtn = e.target.querySelector('button');

        submitBtn.disabled = true;
        submitBtn.innerText = "Entrando...";

        const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert("Acceso denegado: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "INGRESAR";
        } else {
            window.location.href = "index.html";
        }
    });
}