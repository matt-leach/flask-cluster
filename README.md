# flask-cluster

## api endpoints

GET /cluster

parameters:
* method string (kmeans, spectral, ) - method of clustering
* data Boolean - determines whether to return the full dataset
* clusters int - number of clusters

returns json dictionary with key-value pairs:
* clusters: {5: [2,4,1,3,2,1,3]}
* variables: {'var1': [23.4, 56.2, 20, ...], 'var2': [34.6, 34.6, ...]}
