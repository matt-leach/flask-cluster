
from sklearn.cluster import KMeans
from sklearn import decomposition
from sklearn.cluster import AgglomerativeClustering
from sklearn.cluster import SpectralClustering

#for testing below:
#import pandas as pd
#testframe = pd.read_csv('data/cereal.csv')
#X = testframe[testframe.keys()[3:9]]


def pca(X, num_clusters):
    '''
    Principal Component Analysis on X
    Returns array of cluster groups
    '''
    return []


def kmeans(X, num_clusters):
    '''
    K-Means on X for response y
    Returns array of cluster groups
    '''
    model = KMeans(n_clusters=num_clusters)
    model.fit(X.as_matrix())

    return model.labels_


def hierarchical(X, num_clusters):
    '''
    Hierarchical Clustering on X for response y
    Returns array of cluster groups
    '''
    model = AgglomerativeClustering(n_clusters=num_clusters)
    model.fit(X.as_matrix())

    return model.labels_


def spectral(X, num_clusters):
    '''
    Spectral Clustering on X for response y
    Returns array of cluster groups
    '''
    model = SpectralClustering(n_clusters=num_clusters)
    model.fit(X.as_matrix)
    return model.labels_
