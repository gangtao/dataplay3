import uuid from 'uuid'

let dashboards = {
    '1': {
        title: 'sample1',
        decription: 'sample1',
        dataset: 'iris',
        query: 'select * from dataset',
        queryType: undefined,
        grammar: {},
        queryResult: null
    },
    '2': {
        title: 'sample2',
        decription: 'sample2',
        dataset: 'diabetes',
        query: 'select * from dataset',
        queryType: undefined,
        grammar: {},
        queryResult: null
    },
    '3': {
        title: 'sample3',
        decription: 'sample2',
        dataset: 'iris',
        query: 'select * from dataset',
        queryType: 'sql',
        grammar: {},
        queryResult: null
    },
    '4': {
        title: 'sample4',
        decription: 'sample2',
        dataset: 'diabetes',
        query: 'select * from dataset',
        queryType: 'sql',
        grammar: {},
        queryResult: null
    }
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