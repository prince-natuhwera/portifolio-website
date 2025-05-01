/**
 * Main JavaScript for GIS Expert Portfolio Website
 * Handles navigation, modals, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Debugging helper
    function logError(functionName, error) {
        console.error(`Error in ${functionName}: `, error);
    }

    try {
        // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-links');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close mobile menu when clicking a nav link
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    
        // Sticky header on scroll
        const header = document.getElementById('header');
        if (header) {
            let scrollPosition = window.scrollY;
            
            window.addEventListener('scroll', function() {
                scrollPosition = window.scrollY;
                
                if (scrollPosition > 100) {
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                    header.style.background = 'white';
                } else {
                    header.style.boxShadow = 'none';
                    header.style.background = 'white';
                }
            });
        }
    
        // Portfolio filtering - Only run on portfolio page
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.project-item');
        
        if (filterButtons.length && portfolioItems.length) {
            // Set all items to display initially
            portfolioItems.forEach(item => {
                item.style.display = 'block';
            });
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    try {
                        // Remove active class from all buttons
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        
                        // Add active class to clicked button
                        button.classList.add('active');
                        
                        const filterValue = button.getAttribute('data-filter');
                        
                        // Show/hide portfolio items based on filter
                        portfolioItems.forEach(item => {
                            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        });
                    } catch (error) {
                        logError('Portfolio Filtering', error);
                    }
                });
            });
        }
    
        // Project Modal functionality - Only run on portfolio page
        const projectLinks = document.querySelectorAll('.project-link');
        const modals = document.querySelectorAll('.project-modal');
        const closeButtons = document.querySelectorAll('.close-modal');
        
        if (projectLinks.length && modals.length) {
            projectLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    try {
                        e.preventDefault();
                        const modalId = link.getAttribute('href').substring(1);
                        const modal = document.getElementById(modalId);
                        
                        if (modal) {
                            modal.style.display = 'block';
                            document.body.style.overflow = 'hidden';
                        }
                    } catch (error) {
                        logError('Modal Click Handler', error);
                    }
                });
            });
            
            if (closeButtons.length) {
                closeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        try {
                            const modal = button.closest('.project-modal');
                            if (modal) {
                                modal.style.display = 'none';
                                document.body.style.overflow = 'auto';
                            }
                        } catch (error) {
                            logError('Close Button Handler', error);
                        }
                    });
                });
            }
            
            // Close modal when clicking outside content
            window.addEventListener('click', (e) => {
                modals.forEach(modal => {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        }
    
        // FAQ Toggle - Only run on pages with FAQs
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (faqQuestions.length) {
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    try {
                        const answer = question.nextElementSibling;
                        const icon = question.querySelector('.faq-toggle');
                        
                        // Toggle answer visibility
                        if (answer) answer.classList.toggle('active');
                        if (icon) icon.classList.toggle('active');
                    } catch (error) {
                        logError('FAQ Toggle', error);
                    }
                });
            });
        }
    
        // Form validation - Only run on contact page
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('form-status');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                try {
                    // Uncomment if using custom form handling instead of Netlify
                    // e.preventDefault();
                    
                    let isValid = true;
                    const formFields = contactForm.querySelectorAll('input[required], textarea[required]');
                    
                    formFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            field.style.borderColor = 'red';
                        } else {
                            field.style.borderColor = '#e2e8f0';
                        }
                        
                        // Email validation
                        if (field.type === 'email' && field.value) {
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailPattern.test(field.value)) {
                                isValid = false;
                                field.style.borderColor = 'red';
                            }
                        }
                    });
                    
                    if (!isValid) {
                        if (formStatus) {
                            formStatus.textContent = 'Please fill in all required fields correctly.';
                            formStatus.style.display = 'block';
                            formStatus.style.color = 'red';
                            formStatus.style.backgroundColor = '#fee2e2';
                        }
                        e.preventDefault();
                    }
                } catch (error) {
                    logError('Form Validation', error);
                }
            });
            
            // Clear validation styling on input
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('input', () => {
                    input.style.borderColor = '#e2e8f0';
                    if (formStatus) {
                        formStatus.style.display = 'none';
                    }
                });
            });
        }
        
        // Initialize any page-specific elements
        initializePageSpecificElements();
        
    } catch (error) {
        logError('Main Script', error);
    }
    
    // Function to initialize page-specific elements
    function initializePageSpecificElements() {
        try {
            // Check which page we're on by URL path
            const currentPath = window.location.pathname;
            
            // Handle specific pages
            if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '') {
                // Home page specific initializations
                console.log('Home page initialized');
            } else if (currentPath.includes('about.html')) {
                // About page specific initializations
                initializeInterestItems();
                console.log('About page initialized');
            } else if (currentPath.includes('portfolio.html')) {
                // Portfolio page specific initializations
                console.log('Portfolio page initialized');
            } else if (currentPath.includes('services.html')) {
                // Services page specific initializations
                console.log('Services page initialized');
            } else if (currentPath.includes('contact.html')) {
                // Contact page specific initializations
                console.log('Contact page initialized');
            }
        } catch (error) {
            logError('Page Specific Initialization', error);
        }
    }
    
    // Function to initialize interest items on the About page
    function initializeInterestItems() {
        const interestItems = document.querySelectorAll('.interest-item');
        if (interestItems.length) {
            interestItems.forEach((item, index) => {
                item.classList.add('fade-in');
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    }
});
