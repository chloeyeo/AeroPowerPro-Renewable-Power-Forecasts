from abc import ABC, abstractmethod

class QueryGeneratorData(ABC):
    def __init__(self, data) -> None:
        self.data = data
        
    @abstractmethod
    def get_longitude_from_id(self):
        pass

    def get_latitude_from_id(self):
        pass