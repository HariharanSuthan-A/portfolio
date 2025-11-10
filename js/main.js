document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll down
            header.classList.remove('scrolled');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll up
            header.classList.add('scrolled');
            header.classList.remove('scroll-down');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveLink(targetId);
            }
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink(id = null) {
        if (id) {
            // Update active link based on clicked link
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === id) {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        // Update active link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial active link
    updateActiveLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        updateActiveLink();
    });
    
    // Typing effect for hero section
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ['AI Developer', 'AIaaS Specialist', 'Prompt Engineer', 'Machine Learning Enthusiast'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100; // Typing speed in milliseconds
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Delete characters
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Faster when deleting
            } else {
                // Type characters
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal typing speed
            }
            
            // Check if word is complete
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of the word
                typeSpeed = 2000; // Pause before deleting
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to the next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect after a delay
        setTimeout(type, 1000);
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .skills-category, .contact-item, .education-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.project-card, .skills-category, .contact-item, .education-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Add animation to skills on hover
    const skillItems = document.querySelectorAll('.skills-list li');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = 'var(--primary-color)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = 'var(--text-light)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    // Remove loading class from body
    document.body.classList.add('loaded');
    
    // Add animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});
