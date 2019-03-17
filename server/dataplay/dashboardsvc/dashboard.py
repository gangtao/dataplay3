import json

dashboard_config = '''{
    "1": {
        "title": "sample1",
        "description": "area",
        "dataset": "iris",
        "query": "select * from dataset",
        "grammar": {
            "facat": null,
            "coordination": "rect",
            "geom": {
                "Geom1": {
                    "geometry": "area",
                    "position": ["species", "sepal_length"]
                }
            }
        }
    },
    "2": {
        "title": "sample2",
        "description": "pie",
        "dataset": "iris",
        "query": "select * from dataset",
        "grammar": {
            "facat": null,
            "coordination": "theta",
            "geom": {
                "Geom1": {
                    "geometry": "intervalStack",
                    "position": ["sepal_width"],
                    "color": ["species"]
                }
            }
        }
    },
    "3": {
        "title": "sample3",
        "description": "bar",
        "dataset": "iris",
        "query": "select * from dataset",
        "grammar": {
            "facat": null,
            "coordination": "rect",
            "geom": {
                "Geom1": {
                    "geometry": "interval",
                    "position": ["species", "sepal_width"]
                }
            }
        }
    },
    "4": {
        "title": "sample4",
        "description": "scatter",
        "dataset": "iris",
        "query": "select * from dataset",
        "grammar": {
            "facat": null,
            "coordination": "rect",
            "geom": {
                "Geom1": {
                    "geometry": "point",
                    "shape": ["circle"],
                    "position": ["sepal_length", "sepal_width"],
                    "color": ["species"]
                }
            }
        }
    },
    "5": {
        "title": "sample5",
        "description": "line",
        "dataset": "iris",
        "query": "select * from dataset",
        "grammar": {
            "facat": null,
            "coordination": "rect",
            "geom": {
                "Geom1": {
                    "geometry": "line",
                    "position": ["sepal_width", "sepal_length"],
                    "color": ["species"]
                }
            }
        }
    },
    "6": {
        "title": "sample6",
        "description": "polar",
        "dataset": "iris",
        "query": "select * from dataset",
        "grammar": {
            "facat": null,
            "coordination": "polar",
            "geom": {
                "Geom1": {
                    "geometry": "line",
                    "position": ["sepal_width", "petal_width"],
                    "color": ["species"]
                }
            }
        }
    },
    "7": {
        "title": "sample7",
        "description": "polar with query",
        "dataset": "iris",
        "query": "select * from dataset",
        "queryType": "sql",
        "grammar": {
            "facat": null,
            "coordination": "polar",
            "geom": {
                "Geom1": {
                    "geometry": "line",
                    "position": ["sepal_width", "petal_width"],
                    "color": ["species"]
                }
            }
        }
    },
    "8": {
        "title": "sample8",
        "description": "pie with query",
        "dataset": "iris",
        "query": "select * from dataset",
        "grammar": {
            "facat": null,
            "coordination": "theta",
            "geom": {
                "Geom1": {
                    "geometry": "intervalStack",
                    "position": ["sepal_width"],
                    "color": ["species"]
                }
            }
        }
    }
}'''
dashboard = json.loads(dashboard_config)


def get_dashboards():
    return dashboard
