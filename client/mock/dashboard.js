import uuid from 'uuid'

let dashboards = {}

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