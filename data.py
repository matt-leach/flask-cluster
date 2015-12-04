import pandas as pd
from StringIO import StringIO


def convert_csv(filename):
    ''' converts a csv file to a pandas data frame '''
    with file(filename) as f:
        data = pd.read_csv(filename)

    return data._get_numeric_data()


def convert_str(data_str):
    data = pd.read_csv(data_str)
    return data._get_numeric_data()
