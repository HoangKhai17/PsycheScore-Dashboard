const connectWalletBtn = document.getElementById("connect-wallet-btn");
const walletPopup = document.getElementById("wallet-popup");
const closePopupBtn = document.getElementById("close-popup-btn");

if (connectWalletBtn && walletPopup && closePopupBtn) {
	connectWalletBtn.addEventListener("click", () => {
		walletPopup.classList.add("show");
	});

	closePopupBtn.addEventListener("click", () => {
		walletPopup.classList.remove("show");
	});

	walletPopup.addEventListener("click", (e) => {
		if (e.target === walletPopup) {
			walletPopup.classList.remove("show");
		}
	});
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    const applyTheme = (theme) => {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
        } else {
            document.body.classList.remove('dark-theme');
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

// Mobile Sidebar Toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

if (menuToggle && sidebar && sidebarOverlay) {
    const closeSidebar = () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    };

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Profile Page: Copy Wallet Address
const copyWalletBtn = document.getElementById('copy-wallet-btn');
if(copyWalletBtn) {
    copyWalletBtn.addEventListener('click', () => {
        const walletAddressInput = document.getElementById('walletAddress');
        navigator.clipboard.writeText(walletAddressInput.value).then(() => {
            const icon = copyWalletBtn.querySelector('i');
            if (!icon) return;
            icon.classList.remove('bx-copy');
            icon.classList.add('bx-check');
            copyWalletBtn.disabled = true;
            setTimeout(() => {
                icon.classList.remove('bx-check');
                icon.classList.add('bx-copy');
                copyWalletBtn.disabled = false;
            }, 2000);
        });
    });
}