import pandas as pd
from StringIO import StringIO


def convert_csv(filename):
    ''' converts a csv file to a pandas data frame '''
    with file(filename) as f:
        data = pd.read_csv(filename)
    data = data._get_numeric_data()
    names = data.columns.values
    return data, names


def convert_str(data_str):
    data = pd.read_csv(data_str)
    # names = data[data.columns[0]]
    data = data._get_numeric_data()
    return data, data.columns.values
