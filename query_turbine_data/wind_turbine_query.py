import numpy as np
from query_turbine_data.query_abstract import QueryGeneratorData

class QueryWindTurbineData(QueryGeneratorData):
    def __init__(self, data) -> None:
        super().__init__(data)
        self.bm_to_id = self.create_dict()

    def check_bm_in_data(self, bm):
        if(bm in self.bm_to_id.keys()):
            return True
        return False

    def get_data_from_id(self, id):
        if(self.data[:, 6] == id):
            return self.data[self.data[:, 6] == id]
        print("No ", id, "in the database")
        return

    def create_dict(self):
        bm = self.data[self.data[:,2] == "WIND"][:, 1]
        id = self.data[self.data[:,2] == "WIND"][:, 6]
        return dict(zip(bm, id))

    def get_id(self, bm):
        if(self.check_bm_in_data(bm)):
            return self.bm_to_id.get(bm)
        print("No %s in the dataset" % bm)
        return

    def get_longitude_from_id(self, id):
        temp = self.get_data_from_id(id)
        if(np.any(temp[:, 0] == "Longitude")):
            return float(temp[temp[:, 0] == "Longitude"][0][2])
        else:
            print("No Longitude")
            return
        
    def get_latitude_from_id(self, id):
        temp = self.get_data_from_id(id)
        if(np.any(temp[:, 0] == "Latitude")):
            return float(temp[temp[:, 0] == "Latitude"][0][2])
        else:
            print("No Latitude")
            return
    
    def get_number_turbine_from_id(self, id):
        temp = self.get_data_from_id(id)
        if(np.any(temp[:, 0] == 'No. of Turbines')):
            return temp[temp[:, 0] == 'No. of Turbines'][:, 2].astype(float)
        else:
            print("No No. of Turbines")
            return
        
    def get_turbine_capacity_from_id(self, id):
        temp = self.get_data_from_id(id)
        if(np.any(temp[:, 0] == 'Turbine Capacity (MW)')):
            return temp[temp[:, 0] == 'Turbine Capacity (MW)'][:,2].astype(float)
        else:
            print("No Turbine Capacity (MW)")
            return
    
    def get_plant_type_from_id(self, id):
        temp = self.get_data_from_id(id)
        if(np.any(temp[:, 0] == 'Plant Type')):
            return temp[temp[:, 0] == 'Plant Type'][0][2]
        else:
            print("No Plant Type")
            return
    
    def get_hub_hight_from_id(self, id):
        temp = self.get_data_from_id(id)
        if(np.any(temp[:, 0] == 'Hub-Height')):
            return float(temp[temp[:, 0] == 'Hub-Height'][0][2])
        else:
            print("No Hub-Height")
            return