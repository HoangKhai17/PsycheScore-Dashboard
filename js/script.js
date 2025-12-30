document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("light-theme");
            const icon = themeToggle.querySelector("i");
            if (body.classList.contains("light-theme")) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            } else {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }
        });
    }

    // --- Mouse Trail Effect (currently disabled in CSS) ---
    // document.addEventListener("mousemove", (e) => { ... });

    // --- Wallet Connect Logic ---
    // Selects the disconnect button in the header specifically
    const disconnectWalletBtn = document.querySelector(".nav-right .btn-primary");
    const walletPopup = document.getElementById("walletPopup");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const walletAddressDisplay = document.getElementById("walletAddressDisplay");
    const fullWalletAddressEl = document.querySelector(".wallet-address-btn .hidden");
    const copyWalletAddress = document.getElementById("copyWalletAddress");

    if (disconnectWalletBtn) {
        disconnectWalletBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // This logic handles both showing the connect popup and disconnecting
            if (disconnectWalletBtn.textContent.trim() === "Connect Wallet") {
                if (walletPopup) walletPopup.style.display = "flex";
            } else {
                // Handle Disconnect
                disconnectWalletBtn.innerHTML = `<i class="fa-solid fa-wallet"></i> Connect Wallet`;
                if (walletAddressDisplay) walletAddressDisplay.parentElement.classList.add("hidden");
            }
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener("click", () => {
            if (walletPopup) walletPopup.style.display = "none";
        });
    }

    if (walletPopup) {
        walletPopup.addEventListener("click", (e) => {
            if (e.target === walletPopup) {
                walletPopup.style.display = "none";
            }
        });
    }

    const walletItems = document.querySelectorAll(".wallet-item a");
    walletItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            if (walletPopup) walletPopup.style.display = "none";
            if (disconnectWalletBtn) disconnectWalletBtn.innerHTML = `<i class="fa-solid fa-wallet"></i> Disconnect`;
            if (walletAddressDisplay) walletAddressDisplay.parentElement.classList.remove("hidden");
        });
    });

    if (copyWalletAddress && fullWalletAddressEl) {
        const fullWalletAddress = fullWalletAddressEl.textContent;
        copyWalletAddress.addEventListener("click", () => {
            navigator.clipboard.writeText(fullWalletAddress).then(() => {
                alert("Wallet address copied!");
            });
        });
    }


    // --- Chat Popup Logic ---
    const verifyBtn = document.getElementById('verifyBtn');
    const chatPopup = document.getElementById('chatPopup');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');

    if (verifyBtn) {
        verifyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(chatPopup) chatPopup.style.display = 'flex';
            
            if (chatBox && chatBox.children.length === 0) {
                 setTimeout(() => {
                    appendBotMessage("Cảm ơn đi");
                }, 500);
            }
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            if(chatPopup) chatPopup.style.display = 'none';
        });
    }

    if (chatPopup) {
        chatPopup.addEventListener('click', (e) => {
            if (e.target === chatPopup) {
                chatPopup.style.display = 'none';
            }
        });
    }

    function handleSendMessage() {
        if (!userInput || !chatBox) return;
        const messageText = userInput.value.trim();
        if (messageText === '') return;

        appendUserMessage(messageText);
        userInput.value = '';
        userInput.focus();

        setTimeout(() => {
            appendBotMessage("Cảm ơn đi");
        }, 1000);
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', handleSendMessage);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevents form submission if it's in a form
                handleSendMessage();
            }
        });
    }

    function appendUserMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'user-message');
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function appendBotMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'bot-message');
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
