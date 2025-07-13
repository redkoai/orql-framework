/**
 * ORQL UI Module
 * Handles all UI updates and interactions
 */

const UI = {
    elements: {},

    init() {
        // Cache DOM elements
        this.elements = {
            xiField: document.getElementById('xiField'),
            aliceMarker: document.getElementById('aliceMarker'),
            bobMarker: document.getElementById('bobMarker'),
            alicePos: document.getElementById('alicePos'),
            bobPos: document.getElementById('bobPos'),
            aliceP0: document.getElementById('aliceP0'),
            bobP0: document.getElementById('bobP0'),
            aliceHistory: document.getElementById('aliceHistory'),
            bobHistory: document.getElementById('bobHistory'),
            divergence: document.getElementById('divergence'),
            agreement: document.getElementById('agreement'),
            runButton: document.getElementById('runButton'),
            stepButton: document.getElementById('stepButton'),
            resetButton: document.getElementById('resetButton')
        };

        // Initialize display
        this.updateXiFieldDisplay();
        this.updateObserverPositions();
    },

    updateXiFieldDisplay() {
        const visibleBits = window.simulation.xiField.getVisibleSection(0, 50);
        this.elements.xiField.innerHTML = '';
        
        visibleBits.forEach(bit => {
            const div = document.createElement('div');
            div.className = `xi-bit xi-bit-${bit}`;
            this.elements.xiField.appendChild(div);
        });
    },

    updateObserverPositions() {
        const alice = window.simulation.alice;
        const bob = window.simulation.bob;
        
        // Update position text
        this.elements.alicePos.textContent = alice.position;
        this.elements.bobPos.textContent = bob.position;
        
        // Update marker positions
        const aliceVisiblePos = (alice.position % 50) * 2;
        const bobVisiblePos = (bob.position % 50) * 2;
        
        this.elements.aliceMarker.style.left = `${aliceVisiblePos}%`;
        this.elements.bobMarker.style.left = `${bobVisiblePos}%`;
    },

    updateMeasurementHistory() {
        // Update Alice's history
        this.elements.aliceHistory.innerHTML = '';
        window.simulation.alice.outcomes.forEach(outcome => {
            const div = document.createElement('div');
            div.className = `measurement measurement-${outcome}`;
            div.textContent = outcome;
            this.elements.aliceHistory.appendChild(div);
        });

        // Update Bob's history
        this.elements.bobHistory.innerHTML = '';
        window.simulation.bob.outcomes.forEach(outcome => {
            const div = document.createElement('div');
            div.className = `measurement measurement-${outcome}`;
            div.textContent = outcome;
            this.elements.bobHistory.appendChild(div);
        });
    },

    updateStatistics() {
        const alice = window.simulation.alice;
        const bob = window.simulation.bob;

        // Update probabilities
        if (alice.outcomes.length > 0) {
            this.elements.aliceP0.textContent = alice.getProbability(0).toFixed(3);
            this.elements.bobP0.textContent = bob.getProbability(0).toFixed(3);
            
            // Update divergence
            const divergence = window.simulation.getDivergence();
            const agreementRate = window.simulation.getAgreementRate();
            
            this.elements.divergence.textContent = divergence.toFixed(3);
            this.elements.agreement.textContent = (agreementRate * 100).toFixed(1) + '%';
        }
    },

    updateAll() {
        this.updateObserverPositions();
        this.updateMeasurementHistory();
        this.updateStatistics();
    }
};


// Interactive background effects
class InteractiveBackground {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
            this.updateBackground();
        });

        // Create dynamic particles on click
        this.hero.addEventListener('click', (e) => {
            this.createQuantumBurst(e.clientX, e.clientY);
        });
    }

    updateBackground() {
        // Move orbs based on mouse position
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (this.mouseX - 0.5) * speed;
            const y = (this.mouseY - 0.5) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Subtle parallax effect on quantum field
        const quantumField = document.querySelector('.quantum-field');
        if (quantumField) {
            const rotateX = (this.mouseY - 0.5) * 10;
            const rotateY = (this.mouseX - 0.5) * 10;
            quantumField.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    }

    createQuantumBurst(x, y) {
        const burst = document.createElement('div');
        burst.className = 'quantum-burst';
        burst.style.left = `${x}px`;
        burst.style.top = `${y}px`;
        
        // Random color from ORQL palette
        const colors = ['rgba(0, 242, 254, 0.6)', 'rgba(79, 172, 254, 0.6)', 'rgba(255, 0, 110, 0.6)'];
        burst.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        this.hero.appendChild(burst);
        
        // Remove after animation
        setTimeout(() => burst.remove(), 1000);
    }
}

// CSS for quantum burst effect (add to your CSS)
const burstStyles = `
.quantum-burst {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    pointer-events: none;
    animation: burst 1s ease-out forwards;
}

@keyframes burst {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(10);
        opacity: 0;
    }
}
`;

// Initialize on load
window.addEventListener('load', () => {
    new InteractiveBackground();
    
    // Add burst styles
    const style = document.createElement('style');
    style.textContent = burstStyles;
    document.head.appendChild(style);
});

// Global functions for button clicks
window.orql = {
    toggleSimulation() {
        window.simulation.running = !window.simulation.running;
        UI.elements.runButton.textContent = window.simulation.running ? 'Pause' : 'Run Simulation';
        
        if (window.simulation.running) {
            this.runSimulation();
        }
    },

    runSimulation() {
        if (window.simulation.running && !window.simulation.isComplete()) {
            window.simulation.performStep();
            UI.updateAll();
            setTimeout(() => this.runSimulation(), 500);
        } else if (window.simulation.isComplete()) {
            window.simulation.running = false;
            UI.elements.runButton.textContent = 'Run Simulation';
        }
    },

    stepSimulation() {
        if (!window.simulation.isComplete()) {
            window.simulation.performStep();
            UI.updateAll();
        }
    },

    resetSimulation() {
        window.simulation.reset();
        UI.init();
        UI.elements.runButton.textContent = 'Run Simulation';
    }
};

// Initialize when page loads
window.addEventListener('load', () => {
    UI.init();
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
