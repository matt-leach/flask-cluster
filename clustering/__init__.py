
from sklearn.cluster import KMeans
from sklearn.cluster import AgglomerativeClustering
from sklearn.cluster import SpectralClustering
from sklearn import preprocessing

# 3 functions for running clustering
# Input X should be a Pandas dataframe
# X must be all numerical variables, no factors or strings

def kmeans(X, num_clusters):
    '''
    K-Means on X for response y
    Returns array of cluster groups
    '''
    model = KMeans(n_clusters=num_clusters)
    cleanX = preprocessing.scale(X.as_matrix())
    model.fit(cleanX)
    return model.labels_


def hierarchical(X, num_clusters):
    '''
    Hierarchical Clustering on X for response y
    Returns array of cluster groups
    '''
    model = AgglomerativeClustering(n_clusters=num_clusters)
    cleanX = preprocessing.scale(X.as_matrix())
    model.fit(cleanX)
    return model.labels_


def spectral(X, num_clusters):
    '''
    Spectral Clustering on X for response y
    Returns array of cluster groups
    '''
    model = SpectralClustering(n_clusters=num_clusters, eigen_solver= 'arpack', affinity= 'nearest_neighbors')
    cleanX = preprocessing.scale(X.as_matrix())
    model.fit(cleanX)
    return model.labels_
