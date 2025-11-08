document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    if (!chatForm) return; // Don't run on pages without the chat form

    const chatInput = chatForm.querySelector('textarea');
    const chatHistory = document.querySelector('.chat-history');
    const welcomeScreen = document.querySelector('.welcome-screen');

    // Auto-resize textarea and hide welcome message on input
    chatInput.addEventListener('input', () => {
        if (welcomeScreen && welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.display = 'none';
        }
        chatInput.style.height = 'auto';
        chatInput.style.height = (chatInput.scrollHeight) + 'px';
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = chatInput.value.trim();
        if (!userInput) return;

        addMessage(userInput, 'user');

        chatInput.value = '';
        chatInput.style.height = 'auto';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // Simulate bot response
        setTimeout(() => {
            addMessage("This is a simulated response from BBOTech bot. I am not a real AI yet!", 'bot');
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 1000);
    });

    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${type}-message`);

        const avatarSrc = type === 'user' ? 'https://i.pravatar.cc/100?u=cameron' : 'img/logochat.png';
        const avatarAlt = type === 'user' ? 'User Avatar' : 'Bot Avatar';

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerText = text; // Use innerText to prevent XSS

        const avatarElement = document.createElement('img');
        avatarElement.src = avatarSrc;
        avatarElement.alt = avatarAlt;
        avatarElement.classList.add('avatar');

        messageElement.appendChild(avatarElement);
        messageElement.appendChild(messageContent);
        
        chatHistory.appendChild(messageElement);
    }
});
