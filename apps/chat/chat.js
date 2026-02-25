// apps/chat/chat.js
const agentId = 'agent_9601kcrjbe74f08bhzgewfa2fcxw';
let conversation = null;

const voiceBtn = document.getElementById('voice-trigger');
const sendBtn = document.getElementById('send-btn');
const textInput = document.getElementById('text-input');
const chatHistory = document.getElementById('conversation-history');
const statusLabel = document.getElementById('status-text');

function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = role === 'user' ? "text-blue-400 font-medium" : "text-white italic";
    div.innerHTML = `<span class="opacity-50 text-[10px] uppercase block">${role === 'user' ? 'Tú' : 'Irenia'}</span> ${text}`;
    chatHistory.appendChild(div);
    document.getElementById('transcript-box').scrollTop = chatHistory.scrollHeight;
}

async function handleVoice() {
    try {
        if (!conversation) {
            statusLabel.innerText = "Conectando...";
            conversation = await ElevenLabsClient.Conversation.startSession({
                agentId: agentId,
                onConnect: () => { statusLabel.innerText = "Irenia escucha..."; voiceBtn.classList.add('orb-listening'); },
                onDisconnect: () => { statusLabel.innerText = "Motor Listo"; voiceBtn.classList.remove('orb-listening'); conversation = null; },
                onMessage: (msg) => { addMessage(msg.role === 'user' ? 'user' : 'ai', msg.message); }
            });
        } else { await conversation.endSession(); }
    } catch (err) { statusLabel.innerText = "Error de conexión"; }
}

voiceBtn.addEventListener('click', handleVoice);
sendBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (text && conversation) { conversation.sendText(text); textInput.value = ''; }
});
document.getElementById('stop-btn').addEventListener('click', () => { if (conversation) conversation.endSession(); });