from app import app
import settings
from data import convert_csv, convert_str

from flask import render_template, jsonify, request
import pandas as pd
import numpy as np
import json
import shelve


@app.route('/')
def home():
    return render_template('home.html', methods={'Spectral': 'spectral',
                                                 'K-Means': 'kmeans',
                                                 'Hierarchical': 'hierarchcial'})


@app.route('/cluster')
def cluster():
    session = shelve.open(settings.SHELVE_DB)
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

    # Get data - either from session or from DEFAULT_DATA location
    if not session.get('data'):
        X, names = convert_csv(settings.DEFAULT_DATA)
        session['data'] = X.to_json()  # Store in session as json
        session['names'] = names

    else:
        X = pd.read_json(session['data'])
    cluster_vals = method(X, num_clusters)

    # TODO: check numpy array and cast to list if needed
    data = {'clusters': {num_clusters: cluster_vals.tolist()},
            'names': session['names']}
    if return_X_data:
        data['variables'] = {var: X[var].tolist() for var in X}
    session.close()
    return jsonify(data)


@app.route('/data', methods=['POST'])
def load_data():
    session = shelve.open(settings.SHELVE_DB)
    try:
        file_name = dict(request.form)['builtin'][0]
    except Exception as e:
        file_name = None
    if file_name:
        try:
            data, names = convert_csv('data/{}.csv'.format(file_name))
            session['data'] = data.to_json()
            session['names'] = names
        except IOError:
            return jsonify({'error': "No built in data file '{}'.".format(file_name)})
    else:
        # TODO: check works with javascript shizzle
        data, names = convert_str(dict(request.files)['file'][0])
        session['data'] = data.to_json()
        session['names'] = names
    vars = data.columns.values
    session.close()
    return jsonify({'names': vars.tolist()})
