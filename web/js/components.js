// components.js - Load navbar and footer components

// Load component function
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${componentPath}:`, error);
    }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load navbar and footer
    await loadComponent('navbar-container', '/components/navbar.html');
    await loadComponent('footer-container', '/components/footer.html');
    
    // Initialize mobile menu after navbar loads
    initializeMobileMenu();
    
    // Set active page
    setActivePage();
    
    // Initialize footer stats
    initializeFooterStats();
});

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Set active page in navigation
function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageName = currentPage.replace('.html', '') || 'home';
    
    // Desktop nav
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page') || link.getAttribute('href').split('/').pop().replace('.html', '');
        if (linkPage === pageName || (pageName === 'index' && linkPage === 'home')) {
            link.classList.add('active');
        }
    });
    
    // Mobile nav
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize footer stats
function initializeFooterStats() {
    // Get stats from localStorage or use defaults
    const visitors = localStorage.getItem('orql_total_visitors') || '12,847';
    const simulations = localStorage.getItem('orql_total_simulations') || '5,291';
    
    const visitorElement = document.getElementById('footer-visitors');
    const simulationElement = document.getElementById('footer-simulations');
    
    if (visitorElement) visitorElement.textContent = visitors;
    if (simulationElement) simulationElement.textContent = simulations;
}