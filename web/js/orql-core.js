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
