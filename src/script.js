// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ===== Scroll Animations with IntersectionObserver =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for multiple cards
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    observer.observe(card);
});

// Observe section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    observer.observe(title);
});

// Observe mission content
const missionContent = document.querySelector('.mission-content');
if (missionContent) {
    observer.observe(missionContent);
}

// ===== Contact Form Handling =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (name && email && message) {
            // Create a success message
            const successMsg = document.createElement('div');
            successMsg.textContent = 'Message sent successfully! We will get back to you soon.';
            successMsg.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(181, 81, 199, 0.9);
                backdrop-filter: blur(10px);
                color: white;
                padding: 20px 40px;
                border-radius: 50px;
                font-weight: 600;
                z-index: 9999;
                animation: fadeInUp 0.5s ease;
                box-shadow: 0 10px 40px rgba(181, 81, 199, 0.4);
            `;

            document.body.appendChild(successMsg);

            // Reset form
            contactForm.reset();

            // Remove message after 4 seconds
            setTimeout(() => {
                successMsg.style.opacity = '0';
                successMsg.style.transform = 'translateX(-50%) translateY(-20px)';
                successMsg.style.transition = 'all 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(successMsg);
                }, 500);
            }, 4000);
        }
    });
}

// ===== Smooth Scroll for Internal Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Add loading animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
