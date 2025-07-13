"""Sequencer function implementation."""
import numpy as np
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .observer import Observer
    from .quantum_state import QuantumState
    from .xi_field import XiField


class SequencerFunction:
    """Determines observer's path through Xi field."""
    
    @staticmethod
    def compute_next_position(
        observer: "Observer",
        quantum_state: "QuantumState",
        xi_field: "XiField"
    ) -> int:
        """Compute observer's next position in Xi field.
        
        The sequencer function combines:
        - Current Xi field value
        - Quantum state influence
        - Observer's history
        - Observer's seed
        """
        current_xi = xi_field.get_value(observer.position)
        psi_influence = abs(quantum_state.amplitudes[0])**2
        
        step_size = int(
            current_xi * 5 +
            psi_influence * observer.entanglement * 10 +
            len(observer.history) +
            observer.seed % 3
        )
        
        return (observer.position + step_size) % xi_field.size
