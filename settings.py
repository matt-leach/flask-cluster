from clustering import  kmeans, hierarchical, spectral

CLUSTER_METHODS = {'kmeans': kmeans,
                   'hierarchical': hierarchical,
                   'spectral': spectral}

DEFAULT_DATA = 'data/cereal.csv'

SHELVE_DB = 'data/shelve.db'
