const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const sendButton = chatForm.querySelector('button[type="submit"]');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage('Você', userMessage, 'user-message');
    userInput.value = '';
    sendButton.disabled = true;

    // Exibe "digitando..." temporariamente
    const loadingDiv = appendMessage('FURIA Bot', 'Digitando...', 'bot-message');

    try {
        const response = await fetch('/enviar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensagem: userMessage })
        });

        const data = await response.json();

        // Remove o "digitando..."
        loadingDiv.remove();

        // Exibe a resposta real do bot
        appendMessage('FURIA Bot', data.resposta, 'bot-message');
    } catch (err) {
        loadingDiv.remove();
        appendMessage('Erro', 'Ocorreu um erro ao enviar sua mensagem.', 'bot-message');
        console.error('Erro na requisição:', err);
    } finally {
        sendButton.disabled = false;
    }
});

// Cria e adiciona uma nova mensagem ao chat
function appendMessage(sender, message, cssClass) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', cssClass);

    const formattedMessage = formatMarkdown(message);

    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.innerHTML = `<strong>${sender}:</strong> ${formattedMessage}`;

    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageDiv; // Retorna a div caso precise removê-la
}

// Sanitiza o HTML (protege contra XSS)
function sanitizeHtml(input) {
    const div = document.createElement('div');
    div.innerText = input;
    return div.innerHTML;
}

// Converte **texto** em <strong>texto>
function formatMarkdown(message) {
    const safe = sanitizeHtml(message);
    return safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// Scroll suave com destaque do link ativo no menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // ajuste para altura do cabeçalho
                behavior: 'smooth'
            });
        }
    });
});

// ScrollSpy: destaca o link ativo no menu com base na seção visível
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 100; // compensação para ativação antes

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('text-furia', 'font-bold');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('text-furia', 'font-bold');
                }
            });
        }
    });
});


// Garante que o input fique visível quando o teclado abrir no mobile
userInput.addEventListener('focus', () => {
    setTimeout(() => {
        userInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300); // tempo suficiente após o teclado abrir
});
