const history = document.getElementById('conversation-history');
const chatForm = document.getElementById('chat-form');
const textInput = document.getElementById('text-input');
const voiceBtn = document.getElementById('voice-trigger');
const statusText = document.getElementById('status-text');

function addMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = `p-4 rounded-2xl max-w-[80%] ${role === 'user' ? 'bg-blue-600 self-end text-white ml-auto' : 'bg-slate-800 self-start text-slate-200'}`;
    msg.innerText = text;
    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = textInput.value.trim();
        if (!text) return;
        addMessage('user', text);
        textInput.value = '';
        setTimeout(() => addMessage('assistant', "Irenia Pro analizando... ¿Tienes otros síntomas?"), 1000);
    });
}

let active = false;
voiceBtn.addEventListener('click', () => {
    active = !active;
    voiceBtn.classList.toggle('orb-listening', active);
    statusText.innerText = active ? "Escuchando..." : "Motor Listo";
});
