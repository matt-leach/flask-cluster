from clustering import pca, kmeans, hierarchical, spectral

CLUSTER_METHODS = {'pca': pca,
                   'kmeans': kmeans,
                   'hierarchical': hierarchical,
                   'spectral': spectral}

DEFAULT_DATA = 'data/cereal.csv'

SHELVE_DB = 'data/shelve.db'
