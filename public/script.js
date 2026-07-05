const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

/**
 * Menyimpan histori percakapan.
 * Format mengikuti backend.
 */
const conversation = [];

/**
 * Pesan sambutan.
 */
const WELCOME_MESSAGE = `Halo! 👋

Saya adalah chatbot konsultasi tanaman.

Saya dapat membantu mengenai:

🌱 Perawatan tanaman
💧 Penyiraman
🌾 Pemupukan
🐛 Hama tanaman
🍂 Penyakit tanaman

Silakan ajukan pertanyaan Anda.`;

/**
 * Inisialisasi halaman.
 */
init();

function init() {
    appendMessage("bot", WELCOME_MESSAGE);
    input.focus();
}

/**
 * Event submit.
 */
form.addEventListener("submit", handleSubmit);

/**
 * Submit chat.
 */
async function handleSubmit(event) {

    event.preventDefault();

    const message = input.value.trim();

    if (!message) {
        return;
    }

    input.value = "";

    appendMessage("user", message);

    conversation.push({
        role: "user",
        text: message
    });

    input.disabled = true;

    try {

        const answer = await sendToGemini();

        appendMessage("bot", answer);

        conversation.push({
            role: "model",
            text: answer
        });

    } catch (error) {

        console.error(error);

        appendMessage(
            "bot",
            "Maaf, terjadi kesalahan saat menghubungi server."
        );

    } finally {

        input.disabled = false;

        input.focus();

    }

}

/**
 * Request ke backend.
 */
async function sendToGemini() {

    console.log(JSON.stringify(conversation, null, 2));
    const response = await fetch("/api/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            conversation
        })

    });

    const data = await response.json();

    if (!response.ok || !data.success) {

        throw new Error(data.message || "Request gagal.");

    }

    return data.answer;

}

/**
 * Menampilkan chat.
 */
function appendMessage(sender, text) {

    const wrapper = document.createElement("div");
    wrapper.className = `message ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    wrapper.appendChild(bubble);

    chatBox.appendChild(wrapper);

    scrollToBottom();

}

/**
 * Auto scroll.
 */
function scrollToBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}