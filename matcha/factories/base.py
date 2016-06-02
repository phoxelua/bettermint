import abc

from matcha.lib.utils.lazy import Lazy


class BaseFactory(metaclass=abc.ABCMeta):
    """An abstract base factory."""

    @classmethod
    def _create_instance(cls):
        """Creates and initializes a singleton instance."""

        return cls()

    """The singleton instance of this class."""
    instance = Lazy(lambda cls: cls._create_instance())

    @abc.abstractmethod
    def create(self):
        """Creates an instance of the factory's model."""

        pass
