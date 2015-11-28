from app import app
import settings
from data import convert_csv, convert_str

from flask import render_template, jsonify, request, session
import pandas as pd
import numpy as np
import json


@app.route('/')
def home():
    return render_template('home.html', methods=['Spectral', 'K-Means'])


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

    # Get data - either from session or from DEFAULT_DATA location
    if not session.get('data'):
        X = convert_csv(settings.DEFAULT_DATA)
        session['data'] = X.to_json()  # Store in session as json
    else:
        X = pd.read_json(session['data'])
    cluster_vals = method(X, num_clusters)

    data = {'clusters': {num_clusters: cluster_vals.tolist()}}
    if return_X_data:
        data['variables'] = {var: X[var].tolist() for var in X}
    return jsonify(data)


@app.route('/data', methods=['POST'])
def load_data():
    session['data'] = None
    try:
        file_name = json.loads(request.data)['builtin']
    except Exception as e:
        print e
        file_name = None
    if file_name:
        try:
            session['data'] = convert_csv('data/{}.csv'.format(file_name)).to_json()
        except IOError:
            return jsonify({'error': "No built in data file '{}'.".format(file_name)})
    else:
        # TODO: check works with javascript shizzle
        session['data'] = convert_str(request.data).to_json()

    return ""
