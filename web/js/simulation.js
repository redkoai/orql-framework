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
