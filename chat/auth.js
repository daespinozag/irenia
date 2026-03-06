// auth.js

// Lógica de Registro
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;

        const { data, error } = await _supabase.auth.signUp({
            email,
            password,
            options: { data: { phone: phone } }
        });

        if (error) alert("Error: " + error.message);
        else alert("Registro exitoso. Revisa tu email.");
    });
}

// Lógica de Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await _supabase.auth.signOut();
        window.location.replace("login.html");
    });
}

// Proteger la consola: Si no hay sesión, mandar al login
async function protectRoute() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session && window.location.pathname.includes('console.html')) {
        window.location.replace("login.html");
    }
}
protectRoute();
