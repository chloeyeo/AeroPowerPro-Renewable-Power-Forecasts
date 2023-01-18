import csv
import numpy as np
import os

class OpenCsvData:
    def __init__(self, file_path) -> None:
        path = os.path.dirname(__file__)
        # print(path,"\n\n\n")
        file_path = os.path.join(path,file_path)
        print(file_path)
        with open(file_path) as file:
            self.csvreader = csv.reader(file)
            self.data = np.array([])
            self.header = np.array(next(self.csvreader))
            i = 0
            for line in self.csvreader:
                i += 1
                self.data = np.append(self.data, np.array(line))
            self.data = self.data.reshape(i, len(self.header))
            print("Successful Get Data")

    def get_fuel_ids_type(self):
        return self.data

# test = OpenCsvData("query_turbine_data\dictionary_attributes.csv")
# test.get_fuel_ids_type()