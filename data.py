import pandas as pd
from StringIO import StringIO


def convert_csv(filename):
    ''' converts a csv file to a pandas data frame '''
    with file(filename) as f:
        data = pd.read_csv(filename)
    names = data[data.columns[0]]  # names of data points
    data = data._get_numeric_data()
    return data, names.tolist()
