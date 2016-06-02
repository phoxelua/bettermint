import functools
import inspect
from threading import Lock
import weakref


class Lazy:
    """
    Descriptor for values to be loaded lazily.

    Note: Instances of the new Lazy class must be a class variable; it's implemented as a descriptor,
          which only work as class variables.

    1) The patterns for Lazy objects that are instance-per-class are

        class Foo:
            variable = Lazy(lambda: SomeClass())
            variable2 = Lazy(Foo.some_class_method)
            variable3 = Lazy(lambda cls: cls.some_class_method)  # Unlike the previous, can be overridden in a subclass

            @classmethod
            def some_class_method(cls):
                return SomeOtherClass()

    2) The patterns for Lazy objects that are instance-per-instance are

        class Bar:
            variable3 = Lazy(lambda self: SomeClass())

            def _load_lazy(self):
                return YetAnotherClass()

            variable4 = Lazy(_load_lazy)
    """

    def __init__(self, load):
        """
        Initializes a new Lazy.
        :param load: A function that returns the value to assign to the instance.  This function must either take no
            arguments, `self` as its only argument, or `cls` as its only argument.
        """

        if not load:
            raise ValueError('You must provide a function to initialize the value.')

        self._load = load
        """The function to load an instance's value."""

        self._lock = Lock()
        """A lock to synchronize access to the instance-value map."""

        self._values_per_instance = weakref.WeakValueDictionary()
        """A dictionary mapping instance IDs to their individual Lazy objects."""

    def __get__(self, instance, owner):
        """
        Returns the value of a lazy loader for the specified instance of the specified class, instantiating and loading
        the value if necessary.
        """

        instance_id = id(instance or owner)

        if instance_id not in self._values_per_instance:
            with self._lock:
                if instance_id not in self._values_per_instance:
                    loader = self._get_loader(instance, owner, self._load)

                    # Return the descriptor itself if it is accessed from the class and it does not describe a Lazy
                    # that can be loaded for a class.
                    if not instance and not loader.is_class_loader:
                        return self

                    value = LazyValue(loader.loader_func)

                    self._values_per_instance[instance_id] = value

                    # Store a reference to the LazyValue on the instance itself to prevent garbage collection.
                    setattr(
                        instance or owner,
                        '_lazy_{identifier}'.format(identifier=id(self)),
                        value
                    )

        return self._values_per_instance[instance_id].value

    @classmethod
    def _get_loader(
        cls,
        instance,
        owner,
        func
    ):
        """
        Creates a lazy loader from the specified loader function for the specified instance of the specified class.
        :param instance: The instance of the class for which to create the loader if `func` is being called on an
            instance.
        :param owner: The class for which to create the loader if `func` is being called on the class.
        :param func: The parameterized loader function.
        :return: A lazy loader specifying a nullary function created by binding the proper arguments to `func` and a
            boolean indicating whether or not the loader is a class loader.
        """

        loader = None
        is_class_loader = None
        target = instance or owner

        if isinstance(func, classmethod) or isinstance(func, staticmethod):
            loader = func.__get__(instance, owner)
            is_class_loader = True
        else:
            is_bound = False

            # A loader function is considered bound if the function also belongs to the instance loading the Lazy...
            if getattr(getattr(instance, func.__name__, None), '__func__', None) == func:
                is_bound = True
            # ...or if the function's first parameter is 'self', given that it is either a lambda or that the Lazy is
            # being accessed via the class rather than an instance of the class.
            elif not instance or func.__name__ == '<lambda>':
                parameters = inspect.signature(func).parameters

                if len(parameters) > 1:
                    raise ValueError('Lambdas used as the loader for a Lazy must take one or zero parameters.')
                elif len(parameters) == 1:
                    parameter = next(iter(parameters))

                    if parameter == 'self':
                        is_bound = True
                    elif parameter == 'cls':
                        is_bound = True
                        is_class_loader = True
                    else:
                        raise ValueError(
                            'The argument to a lambda used as the loader for a Lazy must be "self" or "cls".'
                        )

            if is_bound:
                loader = functools.partial(func, target)
            else:
                loader = func

            is_class_loader = is_class_loader if is_class_loader is not None else not is_bound

        return LazyLoader(loader, is_class_loader)


class LazyLoader:
    """
    A function for loading a lazy value combined with metadata on whether or not the function can load a value on a
    class and not just an instance.
    """

    def __init__(self, loader_func, is_class_loader):
        self.loader_func = loader_func

        self.is_class_loader = is_class_loader


class LazyValue:
    """Wrapper for a lazy-loaded value."""

    def __init__(self, load):
        """
        Initializes a new Lazy.
        :param load: A function that takes no arguments and returns the value to assign to the instance.
        """

        if not load:
            raise ValueError('You must provide a function to initialize the value.')

        self._load = load
        """The function to load the instance's value."""

        self._lock = Lock()
        """A lock to synchronize access to the instance."""

        self._value = None
        """The value of the instance."""

        self._is_value_loaded = False
        """Whether or not the instance's value has been loaded."""

    def get_value(self):
        """
        Gets the instance's value, loading it if necessary.
        :return: The instance's value.
        """

        if not self._is_value_loaded:
            with self._lock:
                if not self._is_value_loaded:
                    self._value = self._load()

                    self._is_value_loaded = True

        return self._value

    value = property(get_value)
    """The value of the instance. Accessing this property loads the instance if necessary."""
