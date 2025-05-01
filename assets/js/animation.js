/**
 * Animation JavaScript for GIS Expert Portfolio Website
 * Handles scroll animations and interactive effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Debugging helper
    function logError(functionName, error) {
        console.error(`Error in ${functionName}: `, error);
    }
    
    try {
        // Elements to animate on scroll - Handle case where selectors find nothing
        const fadeElements = document.querySelectorAll('.fade-in') || [];
        const slideLeftElements = document.querySelectorAll('.slide-in-left') || [];
        const slideRightElements = document.querySelectorAll('.slide-in-right') || [];
        
        // Add all animated elements to an array for monitoring
        const animatedElements = [...fadeElements, ...slideLeftElements, ...slideRightElements];
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            try {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && 
                    rect.bottom >= 0
                );
            } catch (error) {
                logError('isInViewport', error);
                return false;
            }
        }
        
        // Function to handle scroll animation
        function handleScrollAnimation() {
            try {
                animatedElements.forEach(element => {
                    if (isInViewport(element)) {
                        element.classList.add('active');
                    }
                });
            } catch (error) {
                logError('handleScrollAnimation', error);
            }
        }
    
    // Add animation classes to elements - Only when elements exist
    function initAnimations() {
        try {
            // Make sure all elements with animations are visible by default
            // This prevents content from disappearing if there's an error
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                // Set initial opacity to ensure elements are visible even if animation fails
                el.style.opacity = '1';
            });
            
            // Service Cards - Only initialize if they exist
            const serviceCards = document.querySelectorAll('.service-card');
            if (serviceCards.length) {
                serviceCards.forEach((card, index) => {
                    card.classList.add('fade-in');
                    // Stagger the animation delay
                    card.style.transitionDelay = `${index * 0.1}s`;
                });
            }
            
            // Project Cards - Only initialize if they exist
            const projectCards = document.querySelectorAll('.project-card');
            if (projectCards.length) {
                projectCards.forEach((card, index) => {
                    card.classList.add('fade-in');
                    card.style.transitionDelay = `${index * 0.1}s`;
                });
            }
            
            // About section - Only initialize if elements exist
            const aboutImage = document.querySelector('.about-image');
            const aboutText = document.querySelector('.about-text');
            
            if (aboutImage) aboutImage.classList.add('slide-in-left');
            if (aboutText) aboutText.classList.add('slide-in-right');
            
            // Expertise Cards - Only initialize if they exist
            const expertiseCards = document.querySelectorAll('.expertise-card');
            if (expertiseCards.length) {
                expertiseCards.forEach((card, index) => {
                    card.classList.add('fade-in');
                    card.style.transitionDelay = `${index * 0.1}s`;
                });
            }
            
            // Process Steps - Only initialize if they exist
            const processSteps = document.querySelectorAll('.process-step');
            if (processSteps.length) {
                processSteps.forEach((step, index) => {
                    step.classList.add('fade-in');
                    step.style.transitionDelay = `${index * 0.2}s`;
                });
            }
            
            // Timeline items - Only initialize if they exist
            const timelineItems = document.querySelectorAll('.timeline-item');
            if (timelineItems.length) {
                timelineItems.forEach((item, index) => {
                    if (index % 2 === 0) {
                        item.classList.add('slide-in-left');
                    } else {
                        item.classList.add('slide-in-right');
                    }
                    item.style.transitionDelay = `${index * 0.2}s`;
                });
            }
            
            // Value cards - Only initialize if they exist
            const valueCards = document.querySelectorAll('.value-card');
            if (valueCards.length) {
                valueCards.forEach((card, index) => {
                    card.classList.add('fade-in');
                    card.style.transitionDelay = `${index * 0.1}s`;
                });
            }
            
            // Interest items - Only initialize if they exist
            const interestItems = document.querySelectorAll('.interest-item');
            if (interestItems.length) {
                interestItems.forEach((item, index) => {
                    item.classList.add('fade-in');
                    item.style.transitionDelay = `${index * 0.1}s`;
                });
            }
            
            // Contact form and info - Only initialize if they exist
            const contactInfo = document.querySelector('.contact-info');
            const contactForm = document.querySelector('.contact-form');
            
            if (contactInfo) contactInfo.classList.add('slide-in-left');
            if (contactForm) contactForm.classList.add('slide-in-right');
            
            // Run initial check for elements in viewport
            handleScrollAnimation();
        } catch (error) {
            logError('initAnimations', error);
            // Make sure all content is visible if animation setup fails
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }
    
    // Initialize animations with a slight delay to ensure DOM is fully loaded
    setTimeout(initAnimations, 100);
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.project-link)');
    
    if (anchorLinks.length) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                try {
                    const targetId = this.getAttribute('href');
                    
                    // Skip if it's a modal link or empty href
                    if (targetId === '#' || targetId.includes('modal')) return;
                    
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Adjust for header height
                            behavior: 'smooth'
                        });
                    }
                } catch (error) {
                    logError('Smooth Scroll', error);
                }
            });
        });
    }
    
    // Add fallback to ensure all content is visible after a short delay
    // This prevents content from permanently disappearing due to animation issues
    setTimeout(function() {
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            if (!el.classList.contains('active')) {
                el.classList.add('active');
            }
        });
    }, 2000);
    
    // Typing effect for hero text (optional) - Only run on home page
    const heroHeading = document.querySelector('.hero-content h1');
    const isHomePage = window.location.pathname.includes('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname === '';
    
    if (heroHeading && isHomePage && window.innerWidth > 768) {
        try {
            const text = heroHeading.textContent;
            heroHeading.textContent = '';
            
            let i = 0;
            const typingSpeed = 100; // milliseconds
            
            function typeWriter() {
                if (i < text.length) {
                    heroHeading.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, typingSpeed);
                }
            }
            
            // Start typing effect when page loads
            setTimeout(typeWriter, 500);
        } catch (error) {
            logError('Typing Effect', error);
            // Restore original text if typing effect fails
            if (heroHeading) heroHeading.textContent = text;
        }
    }
    } catch (error) {
        logError('Animation Script', error);
        // Final fallback - make sure all content is visible
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});
