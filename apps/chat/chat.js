// apps/chat/chat.js
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = role === 'ai' 
        ? "p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm bg-slate-800/50 self-start mb-4 border border-slate-700" 
        : "p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm bg-blue-600 text-white self-end ml-auto mb-4";
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msgDiv;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    const { data: { user } } = await _supabase.auth.getUser();
    appendMessage('user', message);
    userInput.value = '';
    const aiDiv = appendMessage('ai', 'Irenia está pensando...');

    try {
        const response = await fetch('https://n8ntest.irenia.app/webhook/chat-irenia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message, user_email: user?.email })
        });
        const data = await response.json();
        aiDiv.innerText = data.output || "Consulta recibida.";
    } catch (error) {
        aiDiv.innerText = "Error de conexión.";
    }
});