#!/bin/bash

# Fix the web structure properly
echo "🔧 Splitting monolithic HTML into proper structure..."

# 1. Create clean HTML structure
cat > web/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ORQL - Observer-Relational Quantum Logic</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <div class="nav-logo">ORQL</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#concept">Concept</a></li>
                <li><a href="#demo">Demo</a></li>
                <li><a href="#formalism">Formalism</a></li>
                <li><a href="#paper">Paper</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <h1>ORQL</h1>
            <p>Observer-Relational Quantum Logic</p>
            <p class="hero-subtitle">A new framework where quantum collapse depends on the observer's path through an information field</p>
            <div class="cta-buttons">
                <a href="#demo" class="cta-button primary-button">Try Interactive Demo</a>
                <a href="#paper" class="cta-button secondary-button">Read the Paper</a>
            </div>
        </div>
    </section>

    <!-- Concept Section -->
    <section id="concept" class="section-dark">
        <h2>The Core Concept</h2>
        <div class="container">
            <p class="section-intro">
                What if quantum collapse isn't universal, but depends on who's observing?
            </p>
            
            <div class="demo-container">
                <h3>Key Ideas</h3>
                <ul class="key-ideas-list">
                    <li>
                        <span class="bullet">▶</span>
                        <strong>Observer-Dependent Collapse:</strong> Different observers collapse the same quantum state differently
                    </li>
                    <li>
                        <span class="bullet">▶</span>
                        <strong>The Ξ Field:</strong> A binary information substrate that all observers traverse
                    </li>
                    <li>
                        <span class="bullet">▶</span>
                        <strong>Sequencer Function:</strong> Maps each observer's state to their unique path through Ξ
                    </li>
                    <li>
                        <span class="bullet">▶</span>
                        <strong>Divergence (Δ):</strong> Quantifies how different observers' realities become
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Interactive Demo Section -->
    <section id="demo" class="section-light">
        <h2>Interactive Demo</h2>
        <div class="demo-container">
            <h3 class="demo-title">Two Observers, One Quantum State</h3>
            <p class="demo-subtitle">
                Watch how Alice and Bob measure the same |ψ⟩ = 0.775|0⟩ + 0.632|1⟩ but get different results
            </p>
            
            <div id="xiFieldContainer" class="xi-field-container">
                <div id="xiField" class="xi-field"></div>
                <div id="aliceMarker" class="observer-marker alice-marker">A</div>
                <div id="bobMarker" class="observer-marker bob-marker">B</div>
            </div>
            
            <div class="controls">
                <button id="runButton" class="control-button" onclick="orql.toggleSimulation()">Run Simulation</button>
                <button id="stepButton" class="control-button" onclick="orql.stepSimulation()">Single Step</button>
                <button id="resetButton" class="control-button" onclick="orql.resetSimulation()">Reset</button>
            </div>
            
            <div class="results">
                <div class="result-card">
                    <h4>Alice (Seed: 42)</h4>
                    <div id="aliceHistory" class="measurement-history"></div>
                    <p>Position: <span id="alicePos">42</span></p>
                    <p>P(|0⟩): <span id="aliceP0">—</span></p>
                </div>
                
                <div class="result-card">
                    <h4>Bob (Seed: 137)</h4>
                    <div id="bobHistory" class="measurement-history"></div>
                    <p>Position: <span id="bobPos">137</span></p>
                    <p>P(|0⟩): <span id="bobP0">—</span></p>
                </div>
                
                <div class="result-card">
                    <h4>Divergence</h4>
                    <p class="divergence-value">
                        Δ = <span id="divergence">0.000</span>
                    </p>
                    <p class="agreement-rate">Agreement Rate: <span id="agreement">—</span></p>
                </div>
            </div>
        </div>
    </section>

    <!-- Mathematical Formalism -->
    <section id="formalism" class="section-dark">
        <h2>Mathematical Formalism</h2>
        <div class="math-section">
            <h3>Core Definitions</h3>
            
            <div class="equation">
                <strong>The Ξ Field:</strong><br>
                Ξ: ℕ → {0,1}<br>
                A binary information substrate mapping positions to bits
            </div>
            
            <div class="equation">
                <strong>Observer State:</strong><br>
                Ω = (s, p, ε, H)<br>
                where s = seed, p = position, ε = entanglement, H = history
            </div>
            
            <div class="equation">
                <strong>Sequencer Function:</strong><br>
                Ωˢ: Observer × QuantumState × Ξ → Position<br>
                Determines observer's path through Ξ based on their state
            </div>
            
            <div class="equation">
                <strong>Collapse Rule:</strong><br>
                C_Ω(|ψ⟩) = |0⟩ if Σ Ξ(p+i) ≤ θ(Ω, |ψ⟩)<br>
                C_Ω(|ψ⟩) = |1⟩ otherwise
            </div>
            
            <div class="equation">
                <strong>Divergence Measure:</strong><br>
                Δ(Ω₁, Ω₂) = λ₁ · d_position + λ₂ · d_history<br>
                Quantifies how different two observers' experiences are
            </div>
        </div>
    </section>

    <!-- Paper Section -->
    <section id="paper" class="section-light">
        <h2>Read the Paper</h2>
        <div class="paper-section">
            <h3>Observer-Relational Quantum Logic (ORQL):</h3>
            <p class="paper-subtitle">A Symbolic Framework for Subjective Collapse and Divergent Realities</p>
            <a href="#" class="cta-button primary-button" onclick="alert('Paper download will be available after publication on viXra')">Download Paper (PDF)</a>
            <p class="paper-status">Submission to viXra pending</p>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>ORQL - Observer-Relational Quantum Logic</p>
        <p class="footer-description">
            A new framework for understanding quantum measurement through observer-dependent collapse
        </p>
    </footer>

    <!-- Scripts -->
    <script src="js/orql-core.js"></script>
    <script src="js/simulation.js"></script>
    <script src="js/ui.js"></script>
</body>
</html>
EOF

# 2. Create CSS file
cat > web/css/style.css << 'EOF'
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #0a0a0a;
}

/* Typography */
h1, h2, h3, h4 {
    font-weight: 600;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.03) 10px,
        rgba(255,255,255,0.03) 20px
    );
    animation: slide 20s linear infinite;
}

@keyframes slide {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
}

.hero-content {
    text-align: center;
    z-index: 1;
    padding: 2rem;
    max-width: 800px;
}

.hero h1 {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #00f2fe, #4facfe, #00f2fe);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
    to { background-position: 200% center; }
}

.hero p {
    font-size: 1.5rem;
    color: #aaa;
    margin-bottom: 2rem;
}

.hero-subtitle {
    font-size: 1.2rem !important;
    margin-bottom: 3rem !important;
}

/* Buttons */
.cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.cta-button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}

.primary-button {
    background: linear-gradient(45deg, #00f2fe, #4facfe);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
}

.primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 242, 254, 0.5);
}

.secondary-button {
    background: transparent;
    color: #00f2fe;
    border: 2px solid #00f2fe;
}

.secondary-button:hover {
    background: rgba(0, 242, 254, 0.1);
    transform: translateY(-2px);
}

/* Navigation */
nav {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1rem 2rem;
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(10px);
    z-index: 1000;
    transition: all 0.3s ease;
}

nav.scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #00f2fe;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    color: #aaa;
    text-decoration: none;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #00f2fe;
}

/* Sections */
section {
    padding: 5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.section-dark {
    background: #0a0a0a;
    color: #fff;
}

.section-light {
    background: #1a1a2e;
    color: #fff;
}

.container {
    max-width: 800px;
    margin: 0 auto;
}

h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    background: linear-gradient(45deg, #00f2fe, #4facfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

h3 {
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
    color: #00f2fe;
}

.section-intro {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #aaa;
}

/* Key Ideas List */
.key-ideas-list {
    list-style: none;
    padding: 0;
}

.key-ideas-list li {
    margin: 1rem 0;
    padding-left: 2rem;
    position: relative;
}

.key-ideas-list .bullet {
    position: absolute;
    left: 0;
    color: #00f2fe;
}

/* Demo Container */
.demo-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 2rem;
    margin: 2rem 0;
    border: 1px solid rgba(0, 242, 254, 0.3);
}

.demo-title {
    text-align: center;
}

.demo-subtitle {
    text-align: center;
    color: #aaa;
    margin-bottom: 2rem;
}

/* Xi Field Visualization */
.xi-field-container {
    position: relative;
}

.xi-field {
    display: grid;
    grid-template-columns: repeat(50, 1fr);
    gap: 2px;
    margin: 2rem 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    position: relative;
}

.xi-bit {
    width: 100%;
    aspect-ratio: 1;
    transition: all 0.3s ease;
}

.xi-bit-0 {
    background: #222;
}

.xi-bit-1 {
    background: #00f2fe;
    box-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
}

/* Observer Markers */
.observer-marker {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: -15px;
    transition: left 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
}

.alice-marker {
    background: #ff006e;
    box-shadow: 0 0 20px rgba(255, 0, 110, 0.8);
}

.bob-marker {
    background: #3a86ff;
    box-shadow: 0 0 20px rgba(58, 134, 255, 0.8);
}

/* Controls */
.controls {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
    justify-content: center;
}

.control-button {
    padding: 0.8rem 1.5rem;
    background: linear-gradient(45deg, #00f2fe, #4facfe);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.control-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 242, 254, 0.5);
}

.control-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Results */
.results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.result-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 10px;
    border: 1px solid rgba(0, 242, 254, 0.3);
}

.result-card h4 {
    color: #00f2fe;
    margin-bottom: 1rem;
}

.measurement-history {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin: 1rem 0;
}

.measurement {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: bold;
}

.measurement-0 {
    background: #222;
    color: #00f2fe;
    border: 1px solid #00f2fe;
}

.measurement-1 {
    background: #00f2fe;
    color: #000;
}

.divergence-value {
    font-size: 2rem;
    text-align: center;
    color: #00f2fe;
}

.agreement-rate {
    text-align: center;
    color: #aaa;
}

/* Mathematical Formalism */
.math-section {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 15px;
    margin: 2rem 0;
    border: 1px solid rgba(0, 242, 254, 0.2);
}

.equation {
    background: rgba(0, 0, 0, 0.5);
    padding: 1.5rem;
    border-radius: 10px;
    margin: 1rem 0;
    font-family: 'Courier New', monospace;
    overflow-x: auto;
}

/* Paper Section */
.paper-section {
    text-align: center;
    padding: 3rem;
    background: linear-gradient(135deg, rgba(0, 242, 254, 0.1), rgba(79, 172, 254, 0.1));
    border-radius: 20px;
    margin: 2rem 0;
}

.paper-subtitle {
    font-size: 1.2rem;
    margin: 2rem 0;
}

.paper-status {
    margin-top: 2rem;
    color: #aaa;
}

/* Footer */
footer {
    background: #0a0a0a;
    color: #aaa;
    text-align: center;
    padding: 3rem 2rem;
    border-top: 1px solid rgba(0, 242, 254, 0.2);
}

.footer-description {
    margin-top: 1rem;
    font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
    .hero h1 { font-size: 2.5rem; }
    .hero p { font-size: 1.2rem; }
    .nav-links { display: none; }
    h2 { font-size: 2rem; }
    .xi-field { grid-template-columns: repeat(25, 1fr); }
}
EOF

# 3. Create core ORQL JavaScript module
cat > web/js/orql-core.js << 'EOF'
/**
 * ORQL Core Module
 * Handles the fundamental ORQL logic
 */

class XiField {
    constructor(size = 1000) {
        this.size = size;
        this.field = Array(size).fill(0).map(() => Math.random() > 0.5 ? 1 : 0);
    }

    getValue(position) {
        return this.field[position % this.size];
    }

    getWindow(position, windowSize = 5) {
        const window = [];
        for (let i = 0; i < windowSize; i++) {
            window.push(this.field[(position + i) % this.size]);
        }
        return window;
    }

    getVisibleSection(start = 0, length = 50) {
        const section = [];
        for (let i = 0; i < length; i++) {
            section.push(this.field[(start + i) % this.size]);
        }
        return section;
    }
}

class Observer {
    constructor(name, seed, entanglement = 1.0) {
        this.name = name;
        this.seed = seed;
        this.position = seed % 1000;
        this.entanglement = entanglement;
        this.outcomes = [];
    }

    recordMeasurement(outcome) {
        this.outcomes.push(outcome);
    }

    getProbability(outcome) {
        if (this.outcomes.length === 0) return 0;
        return this.outcomes.filter(x => x === outcome).length / this.outcomes.length;
    }

    reset() {
        this.position = this.seed % 1000;
        this.outcomes = [];
    }
}

class SequencerFunction {
    static compute(observer, xiField) {
        const currentXi = xiField.getValue(observer.position);
        const stepSize = currentXi * 5 + (observer.seed % 3) + observer.outcomes.length;
        return (observer.position + stepSize) % xiField.size;
    }
}

class CollapseMechanism {
    static collapse(position, xiField, threshold = 2) {
        const window = xiField.getWindow(position, 5);
        const sum = window.reduce((a, b) => a + b, 0);
        return sum > threshold ? 1 : 0;
    }
}

class Divergence {
    static calculate(observer1, observer2) {
        if (observer1.outcomes.length === 0) return 0;
        
        const agreements = observer1.outcomes.filter(
            (outcome, i) => outcome === observer2.outcomes[i]
        ).length;
        
        const agreementRate = agreements / observer1.outcomes.length;
        return 1 - agreementRate;
    }
}

// Export for use in other modules
window.ORQL = {
    XiField,
    Observer,
    SequencerFunction,
    CollapseMechanism,
    Divergence
};
EOF

# 4. Create simulation module
cat > web/js/simulation.js << 'EOF'
/**
 * ORQL Simulation Module
 * Handles the simulation logic
 */

class ORQLSimulation {
    constructor() {
        this.xiField = new ORQL.XiField(1000);
        this.alice = new ORQL.Observer('Alice', 42);
        this.bob = new ORQL.Observer('Bob', 137, 0.8);
        this.running = false;
        this.step = 0;
        this.maxSteps = 20;
    }

    reset() {
        this.xiField = new ORQL.XiField(1000);
        this.alice.reset();
        this.bob.reset();
        this.running = false;
        this.step = 0;
    }

    performStep() {
        if (this.step >= this.maxSteps) {
            this.running = false;
            return false;
        }

        // Update positions
        this.alice.position = ORQL.SequencerFunction.compute(this.alice, this.xiField);
        this.bob.position = ORQL.SequencerFunction.compute(this.bob, this.xiField);

        // Perform measurements
        const aliceOutcome = ORQL.CollapseMechanism.collapse(this.alice.position, this.xiField);
        const bobOutcome = ORQL.CollapseMechanism.collapse(this.bob.position, this.xiField);

        // Record outcomes
        this.alice.recordMeasurement(aliceOutcome);
        this.bob.recordMeasurement(bobOutcome);

        this.step++;
        return true;
    }

    getDivergence() {
        return ORQL.Divergence.calculate(this.alice, this.bob);
    }

    getAgreementRate() {
        return 1 - this.getDivergence();
    }

    isComplete() {
        return this.step >= this.maxSteps;
    }
}

// Create global simulation instance
window.simulation = new ORQLSimulation();
EOF

# 5. Create UI module
cat > web/js/ui.js << 'EOF'
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
EOF

# 6. Commit the changes
echo "📦 Committing properly structured web files..."
git add web/
git commit -m "Refactor: Split monolithic HTML into proper modular structure"

echo "✅ Web structure fixed!"
echo ""
echo "Now you have:"
echo "- Clean HTML with semantic structure"
echo "- Separate CSS file with organized styles"
echo "- Modular JavaScript:"
echo "  - orql-core.js: Core ORQL classes"
echo "  - simulation.js: Simulation logic"
echo "  - ui.js: UI updates and interactions"
echo ""
echo "Benefits:"
echo "✓ Maintainable code"
echo "✓ Clear separation of concerns"
echo "✓ Easy to test and debug"
echo "✓ Follows web development best practices"
echo ""
echo "Test it with:"
echo "cd web && python -m http.server 8000"