import pandas as pd


def convert_csv(filename):
    ''' converts a csv file to a pandas data frame '''
    with file(filename) as f:
        data = pd.read_csv(filename)

    return data._get_numeric_data()
