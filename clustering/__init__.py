# Clustering file
# edit, clustering functions

#X will be pandas dataframe

#output will be dict like this:
#list=array
from sklearn.cluster import KMeans



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
    return []


def spectral(X, num_clusters):
    '''
    Spectral Clustering on X for response y
    Returns array of cluster groups
    '''
    return []
