import uuid from 'uuid'

let dashboards = {
    '1': {
        title: 'sample1',
        description: 'sample1',
        dataset: 'iris',
        query: 'select * from dataset',
        queryType: undefined,
        grammar: {"facat":null,"coordination":"rect","geom":{"Geom1":{"geometry":"area","position":["species","sepal_length"]}}},
        queryResult: null
    },
    '2': {
        title: 'sample2',
        description: 'sample2',
        dataset: 'iris',
        query: 'select * from dataset',
        queryType: undefined,
        grammar: {"facat":null,"coordination":"theta","geom":{"Geom1":{"geometry":"intervalStack","position":["sepal_width"],"color":["species"]}}},
        queryResult: null
    },
    '3': {
        title: 'sample3',
        description: 'sample3',
        dataset: 'iris',
        query: 'select * from dataset',
        queryType: undefined,
        grammar: {"facat":null,"coordination":"rect","geom":{"Geom1":{"geometry":"interval","position":["species","sepal_width"]}}},
        queryResult: null
    },
    '4': {
        title: 'sample4',
        description: 'sample4',
        dataset: 'iris',
        query: 'select * from dataset',
        queryType: undefined,
        grammar: {"facat":null,"coordination":"rect","geom":{"Geom1":{"geometry":"point","shape":["circle"],"position":["sepal_length","sepal_width"],"color":["species"]}}},
        queryResult: null
    },
    '5': {
        title: 'sample5',
        description: 'sample5',
        dataset: 'iris',
        query: 'select * from dataset',
        queryType: undefined,
        grammar: {"facat":null,"coordination":"rect","geom":{"Geom1":{"geometry":"line","position":["sepal_width","sepal_length"],"color":["species"]}}},
        queryResult: null
    },
    '6': {
        title: 'sample6',
        description: 'sample6',
        dataset: 'iris',
        query: 'select * from dataset',
        queryType: undefined,
        grammar: {"facat":null,"coordination":"polar","geom":{"Geom1":{"geometry":"line","position":["sepal_width","petal_width"],"color":["species"]}}},
        queryResult: null
    },
}

function getDashboards(req, res) {
    res.status(200).json(dashboards);
}

function getDashboard(req, res) {
    const { id } = req.params;
    if (id in dashboards) {
        res.status(200).json(dashboards[id]);
    }
    res.status(404).json({});
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
    }
    res.status(404).json({});
}


export default {
    'GET /api/dashboards': getDashboards,
    'GET /api/dashboards/:id': getDashboard,
    'POST /api/dashboards': createDashboards,
    'DELETE /api/dashboards/:id': deleteDashboards,
};