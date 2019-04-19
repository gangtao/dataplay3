import uuid from 'uuid'

let dashboards = {
    '1': {
        title: 'sample1',
        description: 'area',
        dataset: 'iris',
        type: undefined,
        grammar: {"facat":null,"coordination":"rect","geom":{"Geom1":{"geometry":"area","position":["species","sepal_length"]}}}
    },
    '2': {
        title: 'sample2',
        description: 'pie',
        dataset: 'iris',
        type: undefined,
        grammar: {"facat":null,"coordination":"theta","geom":{"Geom1":{"geometry":"intervalStack","position":["sepal_width"],"color":["species"]}}}
    },
    '3': {
        title: 'sample3',
        description: 'bar',
        dataset: 'iris',
        type: undefined,
        grammar: {"facat":null,"coordination":"rect","geom":{"Geom1":{"geometry":"interval","position":["species","sepal_width"]}}}
    },
    '4': {
        title: 'sample4',
        description: 'scatter',
        dataset: 'iris',
        type: undefined,
        grammar: {"facat":null,"coordination":"rect","geom":{"Geom1":{"geometry":"point","shape":["circle"],"position":["sepal_length","sepal_width"],"color":["species"]}}}
    },
    '5': {
        title: 'sample5',
        description: 'line',
        dataset: 'iris',
        type: undefined,
        grammar: {"facat":null,"coordination":"rect","geom":{"Geom1":{"geometry":"line","position":["sepal_width","sepal_length"],"color":["species"]}}}
    },
    '6': {
        title: 'sample6',
        description: 'polar',
        dataset: 'iris',
        type: undefined,
        grammar: {"facat":null,"coordination":"polar","geom":{"Geom1":{"geometry":"line","position":["sepal_width","petal_width"],"color":["species"]}}}
    },
    '7': {
        title: 'sample7',
        description: 'polar with query',
        dataset: 'iris',
        query: 'select * from dataset',
        type: 'sql',
        grammar: {"facat":null,"coordination":"polar","geom":{"Geom1":{"geometry":"line","position":["sepal_width","petal_width"],"color":["species"]}}}
    },
    '8': {
        title: 'sample8',
        description: 'pie with query',
        dataset: 'iris',
        query: 'select * from dataset',
        type: 'sql',
        grammar: {"facat":null,"coordination":"theta","geom":{"Geom1":{"geometry":"intervalStack","position":["sepal_width"],"color":["species"]}}}
    },
}

function getDashboards(req, res) {
    res.status(200).json(dashboards);
}

function getDashboard(req, res) {
    const { id } = req.params;
    if (id in dashboards) {
        res.status(200).json(dashboards[id]);
    } else {
        res.status(404).json({});
    }
}

function createDashboards(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const id = uuid.v4();
    const newDashboard = {};
    newDashboard[id] = body;

    dashboards = Object.assign(dashboards,newDashboard)

    res.status(200).json(id);
}

function deleteDashboards(req, res) {
    const { id } = req.params;
    if (id in dashboards) {
        delete dashboards[id]
        res.status(200).json({});
    } else {
        res.status(404).json({});
    }
}


export default {
    'GET /api/dashboards': getDashboards,
    'GET /api/dashboards/:id': getDashboard,
    'POST /api/dashboards': createDashboards,
    'DELETE /api/dashboards/:id': deleteDashboards,
};