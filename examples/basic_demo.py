"""Basic ORQL demonstration."""
from orql.core import Observer, XiField, QuantumState, SequencerFunction


def main():
    """Run basic ORQL demo."""
    # Initialize components
    xi_field = XiField(size=1000)
    psi = QuantumState.from_probabilities(p0=0.6)
    
    # Create observers
    alice = Observer("Alice", seed=42)
    bob = Observer("Bob", seed=137, entanglement=0.8)
    
    print("ORQL Basic Demo")
    print("=" * 40)
    print(f"Quantum state: P(|0⟩) = {psi.get_probabilities()[0]:.3f}")
    print()
    
    # Run measurements
    for i in range(10):
        # Update positions
        alice.position = SequencerFunction.compute_next_position(alice, psi, xi_field)
        bob.position = SequencerFunction.compute_next_position(bob, psi, xi_field)
        
        # Perform measurements (simplified)
        alice_window = xi_field.get_window(alice.position, 5)
        bob_window = xi_field.get_window(bob.position, 5)
        
        alice_outcome = 0 if sum(alice_window) < 3 else 1
        bob_outcome = 0 if sum(bob_window) < 3 else 1
        
        alice.record_measurement(alice_outcome)
        bob.record_measurement(bob_outcome)
        
        print(f"Measurement {i+1}: Alice={alice_outcome}, Bob={bob_outcome}")
    
    # Show statistics
    print("\nStatistics:")
    print(f"Alice: {alice.get_statistics()}")
    print(f"Bob: {bob.get_statistics()}")


if __name__ == "__main__":
    main()
