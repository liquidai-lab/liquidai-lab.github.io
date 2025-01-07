// Message animation and functionality
function initTelegramBot() {
    const messages = document.querySelectorAll('.message');
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
    });
    
    // Set current time for all messages
    document.querySelectorAll('.message-time').forEach(time => {
        time.textContent = currentTime;
    });
    
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, index * 500);
    });
}

// Copy functionality with Telegram-style toast
function copyAddress() {
    const address = 'F9TdzTUXPN3hEB7Zyfn4qHc8PyTDZCkarrGTGE9opump';
    navigator.clipboard.writeText(address)
        .then(() => {
            const copyButton = document.querySelector('.copy-button');
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            
            // Show toast
            showToast('Address copied to clipboard');
            
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            showToast('Failed to copy address');
        });
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'telegram-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 100);
}

// Command button handlers
function showFeatures() {
    const featuresSection = document.getElementById('features-section');
    featuresSection.style.display = 'block';
    featuresSection.scrollIntoView({ behavior: 'smooth' });
}

function showStats() {
    const statsSection = document.getElementById('stats-section');
    statsSection.style.display = 'block';
    statsSection.scrollIntoView({ behavior: 'smooth' });
}

function showFAQ() {
    showToast('FAQ coming soon');
}

// Add this to your existing main.js
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            question.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}

// Add this to your existing main.js
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 300)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTelegramBot();
    initFAQ();
    window.copyAddress = copyAddress;
    
    // Handle active navigation state
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}); 