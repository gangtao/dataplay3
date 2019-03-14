import json

dashboard_config = '''{
    "1" : 0,
    "2" : 1
}'''
dashboard = json.loads(dashboard_config)


def get_dashboards():
    return dashboard
