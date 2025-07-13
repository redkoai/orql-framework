"""Tests for Observer class."""
import pytest
from orql.core import Observer


def test_observer_creation():
    """Test observer initialization."""
    obs = Observer("Alice", seed=42)
    assert obs.name == "Alice"
    assert obs.seed == 42
    assert obs.position == 42
    assert len(obs.history) == 0


def test_observer_measurement():
    """Test recording measurements."""
    obs = Observer("Bob", seed=137)
    obs.record_measurement(0)
    obs.record_measurement(1)
    assert len(obs.history) == 2
    assert obs.history == [0, 1]
