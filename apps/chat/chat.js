// apps/chat/chat.js

const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Función para añadir mensajes al diseño
function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    // Añadimos clases de Tailwind para el diseño de burbujas
    msgDiv.className = role === 'ai' 
        ? "message-ai p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm self-start mb-4 bg-slate-800/50 border border-slate-700" 
        : "message-user p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm self-end ml-auto mb-4 bg-blue-600 text-white";
    
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll automático
    return msgDiv;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Obtener el usuario actual desde Supabase (Seguridad)
    // Esto sirve para que n8n sepa quién está hablando
    const { data: { user } } = await _supabase.auth.getUser();

    // 2. Mostrar mensaje del usuario en pantalla
    appendMessage('user', message);
    userInput.value = '';

    // 3. Mostrar indicador de "Pensando..."
    const aiMessageDiv = appendMessage('ai', 'Irenia está procesando tu consulta...');

    try {
        // 4. Envío al Webhook de n8n
        const response = await fetch('https://n8ntest.irenia.app/webhook/chat-irenia', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                message: message,
                user_id: user ? user.id : 'anonimo', // Enviamos el ID de usuario a n8n
                user_email: user ? user.email : '',
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) throw new Error('Servidor no disponible');

        const data = await response.json();
        
        // 5. Mostrar la respuesta de la IA
        // n8n debe devolver un campo "output"
        aiMessageDiv.innerText = data.output || "Recibido. Estamos analizando tu información.";

    } catch (error) {
        console.error("Error en n8n:", error);
        aiMessageDiv.innerText = "Hubo un error en mi conexión. ¿Podrías intentar de nuevo en unos segundos?";
        aiMessageDiv.classList.add('text-red-400', 'border-red-500/50');
    }
});