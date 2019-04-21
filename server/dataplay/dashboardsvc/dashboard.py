import json
import os

DASHBOARD_FILE = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'dashboards.json')
with open(DASHBOARD_FILE) as f:
    try:
        dashboard = json.load(f)
    except:
        dashboard = {}


def get_dashboards():
    return dashboard


def save_dashboards():
    with open(DASHBOARD_FILE, 'w') as f:
        f.write(json.dumps(dashboard, indent=2))
