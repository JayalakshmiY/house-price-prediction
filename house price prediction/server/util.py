import json
import pickle
import numpy as np

__locations=None
__data_columns=None
__model=None

def estimated_price(loc,sqft,bhk,bath,balcony):
    try:
        loc_index=__data_columns.index(loc.lower())#bcz if the element is not present it will throw error
    except:
        loc_index=-1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = balcony
    x[3] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0],2)#rounding the float decimal number to 2 numbers



def get_location_names():
    return __locations
def load_saved_artifacts():
    print("Loading the saved artifacts")
    global __data_columns
    global __locations
    global __model
    with open("../price_model/columns.json",'r') as f:
        __data_columns=json.load(f)['data_columns']
        __locations=__data_columns[4:]
    with open("../price_model/banglore_home_prices_model.pickle",'rb') as f:
        __model=pickle.load(f)
    print("loading of saved artifacts...done")
if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(estimated_price('1st Phase JP Nagar',1000,2,2,2))
    print(estimated_price('Indira Nagar',1000,2,1,2))
    print(estimated_price('Indira Nagar',1000,3,1,3))
    print(estimated_price('1st Phase JP Nagar',1000,3,2,3))
    # app.run()