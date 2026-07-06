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
    const typingBubble = showTypingIndicator();

    conversation.push({
        role: "user",
        text: message
    });

    input.disabled = true;

    try {

        const answer = await sendToGemini();

        typingBubble.classList.remove("typing");
        typingBubble.innerHTML = marked.parse(answer);

        conversation.push({
            role: "model",
            text: answer
        });

    } catch (error) {
        typingBubble.classList.remove("typing");

        if (error.message.includes("high demand")) {

            typingBubble.textContent =
                "🌱 Layanan AI sedang sibuk. Silakan coba lagi dalam beberapa saat.";

        } else {

            typingBubble.textContent =
                "Terjadi kesalahan. Silakan coba lagi.";

        }


    } finally {

        input.disabled = false;

        input.focus();

    }

}

/**
 * Request ke backend.
 */
async function sendToGemini() {

    const MAX_RETRY = 3;

    for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {

        try {

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

            if (response.ok && data.success) {
                return data.answer;
            }

            const message = data.message || "";

            // Retry hanya jika Gemini sedang sibuk
            if (
                response.status === 500 &&
                message.includes("high demand")
            ) {

                if (attempt < MAX_RETRY) {

                    console.log(`Retry ${attempt}/${MAX_RETRY}...`);

                    await delay(attempt * 1500);

                    continue;
                }

            }

            throw new Error(message || "Request gagal.");

        } catch (error) {

            if (attempt >= MAX_RETRY) {
                throw error;
            }

            console.log(`Retry ${attempt}/${MAX_RETRY}`);

            await delay(attempt * 1500);

        }

    }

}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Menampilkan chat.
 */
function appendMessage(sender, text) {

    const wrapper = document.createElement("div");
    wrapper.className = `message ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = marked.parse(text);

    wrapper.appendChild(bubble);

    chatBox.appendChild(wrapper);

    scrollToBottom();

}

/**
 * Typing Indicator
 */
function showTypingIndicator() {

    const wrapper = document.createElement("div");
    wrapper.className = "message bot";

    const bubble = document.createElement("div");
    bubble.className = "bubble typing";

    bubble.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    wrapper.appendChild(bubble);

    chatBox.appendChild(wrapper);

    scrollToBottom();

    return bubble;

}

/**
 * Auto scroll.
 */
function scrollToBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}