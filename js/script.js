const connectWalletBtn = document.getElementById("connect-wallet-btn");
const walletPopup = document.getElementById("wallet-popup");
const closePopupBtn = document.getElementById("close-popup-btn");

// New popup elements
const borrowPopup = document.getElementById("borrow-popup");
const lendPopup = document.getElementById("lend-popup");

// Buttons to open popups from the market table
const openBorrowPopupBtn = document.querySelector(".pool-actions .btn-primary"); // Assuming 'Borrow' is primary
const openLendPopupBtn = document.querySelector(".pool-actions .btn-secondary"); // Assuming 'Lend' is secondary

// Close buttons inside the popups
const closeBorrowPopupBtn = borrowPopup ? borrowPopup.querySelector(".close-popup") : null;
const closeLendPopupBtn = lendPopup ? lendPopup.querySelector(".close-popup") : null;

// Toggle buttons inside the popups
const borrowToggleBtnInLend = lendPopup ? lendPopup.querySelector(".toggle-buttons .btn-secondary") : null;
const lendToggleBtnInBorrow = borrowPopup ? borrowPopup.querySelector(".toggle-buttons .btn-secondary") : null;


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

// Logic for Borrow/Lend Popups
if (openBorrowPopupBtn && borrowPopup) {
    openBorrowPopupBtn.addEventListener("click", () => {
        borrowPopup.classList.add("show");
    });
}

if (openLendPopupBtn && lendPopup) {
    openLendPopupBtn.addEventListener("click", () => {
        lendPopup.classList.add("show");
    });
}

if (closeBorrowPopupBtn && borrowPopup) {
    closeBorrowPopupBtn.addEventListener("click", () => {
        borrowPopup.classList.remove("show");
    });
}

if (closeLendPopupBtn && lendPopup) {
    closeLendPopupBtn.addEventListener("click", () => {
        lendPopup.classList.remove("show");
    });
}

// Close popups when clicking outside the content
if (borrowPopup) {
    borrowPopup.addEventListener("click", (e) => {
        if (e.target === borrowPopup) {
            borrowPopup.classList.remove("show");
        }
    });
}

if (lendPopup) {
    lendPopup.addEventListener("click", (e) => {
        if (e.target === lendPopup) {
            lendPopup.classList.remove("show");
        }
    });
}

// Toggle between Borrow and Lend popups
if (lendToggleBtnInBorrow && borrowPopup && lendPopup) {
    lendToggleBtnInBorrow.addEventListener("click", () => {
        borrowPopup.classList.remove("show");
        lendPopup.classList.add("show");
    });
}

if (borrowToggleBtnInLend && borrowPopup && lendPopup) {
    borrowToggleBtnInLend.addEventListener("click", () => {
        lendPopup.classList.remove("show");
        borrowPopup.classList.add("show");
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