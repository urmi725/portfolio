/*
===============================
   Main JavaScript for Sneha Shakya's Portfolio
   Author: Sneha Shakya
   Version: 1.0
===============================
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('preloader-hide');
        setTimeout(function() {
            preloader.style.display = 'none';
            document.body.classList.remove('loading');
        }, 600);
    });

    // Initialize Typed.js
    const typed = new Typed('.typed-text', {
        strings: ['Developer', 'Designer', 'Freelancer', 'Professional'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile navigation when clicking on nav links
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);

    // Portfolio Filter
    const filterItems = document.querySelectorAll('.portfolio-filter li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterItems.length > 0 && portfolioItems.length > 0) {
        filterItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all filter items
                filterItems.forEach(filter => filter.classList.remove('filter-active'));
                
                // Add active class to clicked filter item
                this.classList.add('filter-active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show all items if filter is 'all', otherwise filter
                portfolioItems.forEach(portfolioItem => {
                    if (filterValue === 'all') {
                        portfolioItem.style.display = 'block';
                        setTimeout(() => {
                            portfolioItem.style.opacity = '1';
                            portfolioItem.style.transform = 'scale(1)';
                        }, 50);
                    } else if (portfolioItem.classList.contains(filterValue)) {
                        portfolioItem.style.display = 'block';
                        setTimeout(() => {
                            portfolioItem.style.opacity = '1';
                            portfolioItem.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        portfolioItem.style.opacity = '0';
                        portfolioItem.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            portfolioItem.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
    }

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Toggle theme
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add a slight delay to the follower for a smoother effect
            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Add special cursor styles for links, buttons, etc.
        document.querySelectorAll('a, button, .btn, .portfolio-item, .nav-links li, .theme-toggle')
            .forEach(element => {
                element.addEventListener('mouseenter', function() {
                    cursor.classList.add('cursor-grow');
                    cursorFollower.classList.add('cursor-grow');
                });
                
                element.addEventListener('mouseleave', function() {
                    cursor.classList.remove('cursor-grow');
                    cursorFollower.classList.remove('cursor-grow');
                });
            });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                formMessage.innerHTML = '<div class="error-message">Please fill all fields!</div>';
                return;
            }
            
            // Show loading state
            formMessage.innerHTML = '<div class="loading-message">Sending...</div>';

            // Send form data to the backend
            fetch('http://127.0.0.1:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.innerHTML = `<div class="success-message">${data.message}</div>`;
                    contactForm.reset();
                } else {
                    formMessage.innerHTML = `<div class="error-message">${data.message}</div>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formMessage.innerHTML = '<div class="error-message">An error occurred. Please try again later.</div>';
            })
            .finally(() => {
                 // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.innerHTML = '';
                }, 5000);
            });
        });
    }
});

// Firebase Configuration
// This would be implemented once you have your Firebase credentials
function initializeFirebase() {
    // Your Firebase configuration
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

// Call this function once you have your Firebase credentials
// initializeFirebase();
