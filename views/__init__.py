from app import app
import settings
from data import convert_csv

from flask import render_template, jsonify, request
import pandas as pd
import numpy as np


@app.route('/')
def home():
    return render_template('home.html', methods=['Spectral', 'K-Means'])


@app.route('/cluster')
def cluster():
    method_name = request.args.get('method')
    method = settings.CLUSTER_METHODS[method_name]
    num_clusters = int(request.args.get('clusters'))
    return_X_data = bool(request.args.get('data'))

    # TODO: error handling

    X = convert_csv('static/cereal.csv')

    cluster_vals = method(X, num_clusters)

    data = {'clusters': {num_clusters: cluster_vals.tolist()}}
    if return_X_data:
        data['variables'] = {var: X[var].tolist() for var in X}
    return jsonify(data)
