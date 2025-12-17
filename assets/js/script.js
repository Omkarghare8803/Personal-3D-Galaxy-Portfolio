// ========================================
// OWNERSHIP & COPYRIGHT
// Creator: Omkar R. Ghare
// Email: omkarghare88@gmail.com
// Copyright: 2025
// All Rights Reserved
// 
// Project: Personal 3D Galaxy Portfolio Website
// Technologies: HTML, CSS, JavaScript, Three.js
// 
// This file is protected and should not be modified
// without explicit permission from the creator.
// ========================================

// Protected Creator Verification
(function() {
    const creatorSignature = {
        name: "Omkar R. Ghare",
        email: "omkarghare88@gmail.com",
        copyright: 2025,
        token: "OMK_GHR_2025_PROTECTED"
    };
    
    // Store signature in window object (read-only verification)
    Object.defineProperty(window, '__CREATOR__', {
        value: creatorSignature,
        writable: false,
        configurable: false,
        enumerable: false
    });
    
    // Verify identity on page load
    document.addEventListener('DOMContentLoaded', function() {
        const creatorDiv = document.getElementById('creator-identity');
        if (creatorDiv && creatorDiv.getAttribute('data-creator') === 'Omkar R. Ghare') {
            console.log('%cCreator: ' + creatorSignature.name, 'color: #00d2ff; font-weight: bold;');
            console.log('%cEmail: ' + creatorSignature.email, 'color: #9d00ff;');
            console.log('%cCopyright: ' + creatorSignature.copyright, 'color: #00d2ff;');
        }
    });
})();


// Initialize Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
// Set ARIA attributes for accessibility
mobileMenu.setAttribute('role', 'button');
mobileMenu.setAttribute('aria-label', 'Toggle navigation');
mobileMenu.setAttribute('aria-expanded', 'false');
mobileMenu.setAttribute('aria-controls', 'main-navigation');
navMenu.setAttribute('id', 'main-navigation');

mobileMenu.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    
    // Animate hamburger
    const bars = document.querySelectorAll('.bar');
    if (isActive) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling for internal links (improves UX on all devices)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1 && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
const tl = gsap.timeline();

tl.from('.logo', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
})
.from('.nav-menu li', {
    y: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
}, '-=0.5')
.from('.hero-subtitle', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
}, '-=0.5')
.from('.hero-title', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
}, '-=0.6')
.from('.hero-description', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
}, '-=0.6')
.from('.hero-btns', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
}, '-=0.6')
.from('.astronaut-container', {
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
}, '-=1');

// Scroll Animations
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
});

// Counter Animation
const statsSection = document.querySelector('#about');
let animatedStats = false;

window.addEventListener('scroll', () => {
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animatedStats) {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200;
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        animatedStats = true;
    }
});

// Three.js Background
const initThreeJS = () => {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        // Spread particles across a wide area
        posArray[i] = (Math.random() - 0.5) * 15; // Range -7.5 to 7.5
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material for particles
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add some larger "stars" or planets
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 100;
    const starsPosArray = new Float32Array(starsCount * 3);
    
    for(let i = 0; i < starsCount * 3; i++) {
        starsPosArray[i] = (Math.random() - 0.5) * 20;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPosArray, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });
    
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Add a Wireframe Planet
    const planetGeometry = new THREE.SphereGeometry(2, 64, 64);
    const planetMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Add a Ring around the planet
    const ringGeometry = new THREE.RingGeometry(2.5, 3, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x9d00ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    camera.position.z = 3;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Clock for animation
    const clock = new THREE.Clock();

    const animate = () => {
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        const elapsedTime = clock.getElapsedTime();

        // Rotate the entire particle system
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;
        
        starsMesh.rotation.y = elapsedTime * 0.03;
        starsMesh.rotation.x = elapsedTime * 0.01;

        // Animate Planet and Ring
        planet.rotation.y = elapsedTime * 0.1;
        ring.rotation.z = elapsedTime * 0.05;
        ring.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.5) * 0.1;

        // Smooth mouse movement effect
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initThreeJS();

// Back-to-top button logic
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.6) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Newsletter form simple handler
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        if (!email || !/.+@.+\..+/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        // Placeholder: implement real subscribe integration
        newsletterForm.querySelector('button').innerText = 'Subscribed';
        newsletterForm.reset();
        setTimeout(() => { newsletterForm.querySelector('button').innerText = 'Subscribe'; }, 2500);
    });
}
