from app import app
import settings

from flask import render_template, jsonify, request


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/cluster')
def cluster():
    method_name = request.args.get('method')
    method = settings.CLUSTER_METHODS[method_name]
    num_clusters = int(request.args.get('clusters'))
    return_X_data = bool(request.args.get('data'))

    # TODO: error handling

    X = []  # TODO

    cluster_vals = method(X, num_clusters)
    data = {'clusters': {num_clusters: cluster_vals}}
    if return_X_data:
        # TODO: convert data frame to dict of values
        pass
    # return jsonify(data)

    return jsonify({'clusters': {num_clusters: [1, 3, 2, 1, 1, 2, 2, 3, 1, 1]},
                    'variables': {'var1': [20, 40, 15, 25, 30, 10, 20, 35, 15, 20],
                                  'var2': [5, 10, 0, 7, 8, 7, 3, 5, 10, 12]},
                    'method': method_name})
