// apps/chat/auth.js
async function sessionGuard() {
    if (typeof _supabase === 'undefined') return;
    const { data: { session } } = await _supabase.auth.getSession();
    const path = window.location.pathname;

    if (session && (path.includes('login.html') || path.includes('register.html'))) {
        window.location.replace("index.html");
    } else if (!session && path.includes('index.html')) {
        window.location.replace("login.html");
    }
}
sessionGuard();

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const { error } = await _supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else window.location.replace("index.html");
    });
}

// Register
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const { error } = await _supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else { alert("¡Revisa tu correo!"); window.location.replace("login.html"); }
    });
}