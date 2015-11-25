from app import app
from clustering import pca, kmeans, hierarchical, spectral

from flask import render_template, jsonify, request


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/cluster')
def cluster():
    methods = {'pca': pca, 'kmeans': kmeans, 'hierarchical': hierarchical,
               'spectral': spectral}
    method = methods[request.args.get('method')]
    num_clusters = int(request.args.get('clusters'))
    data = bool(request.args.get('data'))

    # TODO: error handling

    return jsonify({'clusters': {num_clusters: [1, 3, 2, 1, 1, 2, 2, 3, 1, 1]},
                    'variables': {'var1': [20, 40, 15, 25, 30, 10, 20, 35, 15, 20],
                                  'var2': [5, 10, 0, 7, 8, 7, 3, 5, 10, 12]}})
