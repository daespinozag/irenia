// apps/chat/chat.js
const agentId = 'agent_9601kcrjbe74f08bhzgewfa2fcxw';
let conversation = null;

const voiceBtn = document.getElementById('voice-trigger');
const stopBtn = document.getElementById('stop-btn');
const sendBtn = document.getElementById('send-btn');
const textInput = document.getElementById('text-input');
const history = document.getElementById('conversation-history');
const status = document.getElementById('status-text');

function updateHistory(role, text) {
    const p = document.createElement('p');
    p.className = role === 'user' ? "text-blue-400 mb-2" : "text-white mb-4";
    p.innerHTML = `<strong>${role === 'user' ? 'Tú' : 'Irenia'}:</strong> ${text}`;
    history.appendChild(p);
    document.getElementById('transcript-box').scrollTop = history.scrollHeight;
}

async function startSession() {
    try {
        conversation = await ElevenLabsClient.Conversation.startSession({
            agentId: agentId,
            onConnect: () => {
                status.innerText = "En línea";
                voiceBtn.classList.add('orb-active');
            },
            onDisconnect: () => {
                status.innerText = "Desconectado";
                voiceBtn.classList.remove('orb-active');
                conversation = null;
            },
            onMessage: (message) => {
                updateHistory(message.role, message.message);
            }
        });
    } catch (e) { status.innerText = "Error de conexión"; }
}

// Enviar texto manualmente
sendBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (text && conversation) {
        conversation.sendText(text); // El SDK permite enviar texto a la sesión de voz
        textInput.value = '';
    }
});

voiceBtn.addEventListener('click', () => !conversation ? startSession() : conversation.endSession());
stopBtn.addEventListener('click', () => conversation?.endSession());