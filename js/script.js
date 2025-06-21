// Main JavaScript functionality for the romantic website

// Music functionality
let isPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.textContent = '🎵';
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(e => {
            console.log('Audio play failed:', e);
        });
        musicIcon.textContent = '🔇';
        isPlaying = true;
    }
}

// Begin button functionality
function handleBeginClick() {
    // Add a magical transition effect
    const btn = document.getElementById('beginBtn');
    btn.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Navigate to love letter page
        window.location.href = 'love-letter.html';
    }, 200);
}

// Create more floating hearts
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    const hearts = ['💕', '💖', '💗', '💝', '💘'];
    
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            const heart = document.createElement('div');
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (1.5 + Math.random()) + 'rem';
            heart.style.animation = 'float 6s linear forwards';
            heart.style.pointerEvents = 'none';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.opacity = '0.7';
            
            container.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 6000);
        }
    }, 2000);
}

// Smooth scroll for navigation
function smoothScroll() {
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
}

// Add sparkle effect on hover for special elements
function addSparkleEffect() {
    const specialElements = document.querySelectorAll('.begin-btn, .flip-card, .vinyl-record');
    
    specialElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 10px rgba(255, 193, 204, 0.6))';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
}

// Mobile navigation toggle
function setupMobileNav() {
    const navToggle = document.createElement('div');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';
    navToggle.style.display = 'none';
    navToggle.style.fontSize = '1.5rem';
    navToggle.style.cursor = 'pointer';
    navToggle.style.color = 'var(--deep-purple)';
    
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (navContainer && navLinks) {
        navContainer.insertBefore(navToggle, navLinks);
        
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
        
        // Show toggle on mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        function handleMediaQuery(e) {
            if (e.matches) {
                navToggle.style.display = 'block';
                navLinks.style.display = 'none';
            } else {
                navToggle.style.display = 'none';
                navLinks.style.display = 'flex';
                navLinks.classList.remove('mobile-active');
            }
        }
        
        mediaQuery.addListener(handleMediaQuery);
        handleMediaQuery(mediaQuery);
    }
}



// playVinyl() Function

let audioPlayer = new Audio(); // global audio player

function playVinyl(vinylElement, song, index) {
    // Stop previous song
    audioPlayer.pause();
    audioPlayer.currentTime = 0;

    // Remove active class from all records
    document.querySelectorAll('.vinyl-record').forEach(vinyl => {
        vinyl.classList.remove('playing');
    });

    // Add spinning class
    vinylElement.classList.add('playing');

    // Load and play the audio
    audioPlayer = new Audio(song.file);
    audioPlayer.play().catch(err => console.error("Error playing:", err));

    // Show now playing
    const nowPlaying = document.getElementById('nowPlaying');
    const currentSong = document.getElementById('currentSong');
    currentSong.textContent = song.title;
    nowPlaying.style.display = 'block';

    // Stop spinning after song ends
    audioPlayer.onended = () => {
        vinylElement.classList.remove('playing');
        nowPlaying.style.display = 'none';
    };
}




// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Page loading effects
function setupPageTransitions() {
    // Fade in page content
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    // Handle page navigation with transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up music toggle
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    // Set up begin button
    const beginBtn = document.getElementById('beginBtn');
    if (beginBtn) {
        beginBtn.addEventListener('click', handleBeginClick);
    }
    
    // Initialize other features
    createFloatingHearts();
    smoothScroll();
    addSparkleEffect();
    setupMobileNav();
    setupScrollAnimations();
    setupPageTransitions();
});

// Utility functions for other pages
window.romanticUtils = {
    showToast: function(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-pink);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    },
    
    randomElement: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    
    saveToStorage: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
            return false;
        }
    },
    
    loadFromStorage: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('Could not load from localStorage:', e);
            return defaultValue;
        }
    }
};
