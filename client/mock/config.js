let configs = {
    'server': {
        "server": {
            "host": "0.0.0.0",
            "port": "8000",
            "debug": "true",
            "workers": "3"
        }
    },
    'dataset_type': {
        "csv": {
            "module": "dataplay.datasvc.csv",
            "class": "CSV"
        }
    },
    'datasets': {
        "iris": {
            "content": "iris.csv",
            "name": "iris",
            "type": "csv",
            "description": "This is perhaps the best known database to be found in the pattern recognition literature. Fisher's paper is a classic in the field and is referenced frequently to this day. (See Duda & Hart, for example.) The data set contains 3 classes of 50 instances each, where each class refers to a type of iris plant. One class is linearly separable from the other 2; the latter are NOT linearly separable from each other."
        },
        "housing": {
            "content": "housing.csv",
            "name": "housing",
            "type": "csv",
            "description": ""
        },
        "logins": {
            "content": "logins.csv",
            "name": "logins",
            "type": "csv",
            "description": ""
        }
    }
}

function getConfigurations(req, res) {
    res.status(200).json(Object.keys(configs));
}

function getConfiguration(req, res) {
    const { domain } = req.params;
    res.status(200).json(configs[domain]);
}

function saveConfiguration(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const { domain } = req.params;
    configs[domain] = body
    res.status(200).json({});
}

export default {
    'GET /api/confs': getConfigurations,
    'GET /api/confs/:domain': getConfiguration,
    'POST /api/confs/:domain': saveConfiguration,
};