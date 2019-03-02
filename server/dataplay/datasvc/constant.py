import os

CSV_DATASET_PATH = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', 'dataset')

QUERY_TYPE_NORMAL = 'query'
QUERY_TYPE_SQL = 'sql'
QUERY_TYPES = [QUERY_TYPE_NORMAL, QUERY_TYPE_SQL]
