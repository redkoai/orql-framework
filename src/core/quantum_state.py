"""Quantum state representation."""
import numpy as np
from typing import Tuple


class QuantumState:
    """Represents a quantum state |ψ⟩ = α|0⟩ + β|1⟩."""
    
    def __init__(self, alpha: complex, beta: complex):
        """Initialize quantum state with amplitudes."""
        # Normalize
        norm = np.sqrt(abs(alpha)**2 + abs(beta)**2)
        self.amplitudes = np.array([alpha/norm, beta/norm])
    
    @classmethod
    def from_probabilities(cls, p0: float) -> "QuantumState":
        """Create state from probability of |0⟩."""
        alpha = np.sqrt(p0)
        beta = np.sqrt(1 - p0)
        return cls(alpha, beta)
    
    def get_probabilities(self) -> Tuple[float, float]:
        """Get measurement probabilities."""
        p0 = abs(self.amplitudes[0])**2
        p1 = abs(self.amplitudes[1])**2
        return p0, p1
