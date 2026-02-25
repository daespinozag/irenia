// apps/chat/chat.js

// Tu ID de Agente de ElevenLabs
const agentId = 'agent_9601kcrjbe74f08bhzgewfa2fcxw';
let conversation = null;

// Referencias a la interfaz
const voiceBtn = document.getElementById('voice-trigger'); // El botón azul circular
const statusLabel = document.getElementById('status-text');

async function toggleIreniaVoice() {
    try {
        if (!conversation) {
            // INICIAR SESIÓN DE VOZ
            statusLabel.innerText = "Conectando con Irenia...";
            
            conversation = await ElevenLabsClient.Conversation.startSession({
                agentId: agentId,
                onConnect: () => {
                    statusLabel.innerText = "Irenia te escucha...";
                    voiceBtn.classList.add('animate-pulse', 'bg-red-600'); 
                    voiceBtn.innerHTML = '<i class="fas fa-stop text-white text-2xl"></i>';
                },
                onDisconnect: () => {
                    statusLabel.innerText = "Sesión finalizada.";
                    voiceBtn.classList.remove('animate-pulse', 'bg-red-600');
                    voiceBtn.innerHTML = '<i class="fas fa-microphone text-white text-2xl"></i>';
                    conversation = null;
                },
                onModeChange: (mode) => {
                    if (mode.mode === 'speaking') statusLabel.innerText = "Irenia está hablando...";
                    else statusLabel.innerText = "Irenia te escucha...";
                }
            });
        } else {
            // DETENER SESIÓN
            await conversation.endSession();
            conversation = null;
        }
    } catch (error) {
        console.error("Error de ElevenLabs:", error);
        statusLabel.innerText = "Error: Revisa créditos o conexión.";
    }
}

if (voiceBtn) {
    voiceBtn.addEventListener('click', toggleIreniaVoice);
}