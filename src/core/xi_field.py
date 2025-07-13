"""Xi field implementation - the information substrate."""
import numpy as np
from typing import Optional


class XiField:
    """Binary information field that observers traverse.
    
    The Xi field represents the substrate through which observers
    move to determine measurement outcomes.
    """
    
    def __init__(self, size: int = 10000, seed: Optional[int] = None):
        """Initialize Xi field with random binary values."""
        if seed is not None:
            np.random.seed(seed)
        self.field = np.random.randint(0, 2, size)
        self.size = size
    
    def get_window(self, position: int, window_size: int = 10) -> np.ndarray:
        """Get a window of Xi field values."""
        indices = [(position + i) % self.size for i in range(window_size)]
        return self.field[indices]
    
    def get_value(self, position: int) -> int:
        """Get single Xi field value at position."""
        return self.field[position % self.size]
