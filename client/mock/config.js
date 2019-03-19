import uuid from 'uuid'

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