from app import app
import settings
from data import convert_csv

from flask import render_template, jsonify, request, session

import pandas as pd
import numpy as np
import json


@app.route('/')
def home():
    return render_template('home.html', methods=[{'name': 'K-Means', 'value': 'kmeans'},
                                                 {'value': 'spectral', 'name': 'Spectral'},
                                                 {'name': 'Hierarchical', 'value': 'hierarchical'}],
                                        builtins=[{'name': 'Cereal Data', 'file': 'cereal.csv'},
                                                  {'name': 'Ruspini', 'file': 'ruspini.csv'},
                                                  {'name': 'X Clara', 'file': 'xclara.csv'}])


@app.route('/cluster')
def cluster():
    try:
        method_name = request.args.get('method')
        method = settings.CLUSTER_METHODS[method_name]
    except KeyError:
        methods = ','.join(settings.CLUSTER_METHODS.keys())
        error = "parameter 'method' must be one of the following: {}".format(methods)
        return jsonify({'error': error})

    try:
        num_clusters = int(request.args.get('clusters'))
        if num_clusters < 1:
            raise TypeError
    except (TypeError, ValueError):
        error = "parameter 'clusters' must be an integer number of clusters > 0"
        return jsonify({'error': error})

    return_X_data = bool(request.args.get('data'))

    # Get dataset - either from session or from DEFAULT_DATASET location
    dataset = session.get('dataset', settings.DEFAULT_DATASET)

    # Convert csv to dataframe
    X, names = convert_csv('data/{}'.format(dataset))

    cluster_vals = method(X, num_clusters)

    # TODO: check numpy array and cast to list if needed
    data = {'clusters': {num_clusters: cluster_vals.tolist()},
            'names': names}

    if return_X_data:
        data['variables'] = {var: X[var].tolist() for var in X}
    return jsonify(data)


@app.route('/data', methods=['POST'])
def load_data():
    try:
        file_name = dict(request.form)['builtin'][0]
    except Exception as e:
        file_name = None
    if file_name:
        try:
            data, names = convert_csv('data/{}'.format(file_name))
        except IOError:
            return jsonify({'error': "No built in data file '{}'.".format(file_name)})
    else:
        csv_file = dict(request.files)['file'][0]
        file_name = csv_file.filename

        # save the csv to data dir
        csv_file.save('data/{}'.format(file_name))

        # then just convert it as usual
        data, names = convert_csv('data/{}'.format(file_name))

    # update the dataset session var
    session['dataset'] = file_name

    # return data
    return jsonify({'variable_names': data.columns.values.tolist()})
