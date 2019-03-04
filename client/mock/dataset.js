import iris from './data/iris.json';
import diabetes from './data/diabetes.json';
import appUsage from './data/app_usage.json';
import churn from './data/churn.json';
import logins from './data/logins.json';

const database = [iris,diabetes,appUsage,churn,logins]

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

function getDatasets(req, res) {
    const newData = database.map(function(item) {
        return {
            id: item.id,
            name: item.name
        };
    });
    res.status(200).json(newData);
}

function getDataset(req, res) {
    const { id } = req.params;

    const newData = database.find(item => item.id === id);
    if (newData) {
        res.status(200).json(newData);
    } else {
        // 404 is not handled by the request component ui now
        res.status(404).json(NOTFOUND);
    }
}

function fakeQuery(dataset) {
    const result = {};
    const rColThreshold = Math.random();
    const rRawThreshold = Math.random();
    const colsIndex = [];
    const cols = [];
    const rows = [];

    for (let i = 0; i < dataset.cols.length; i+=1) {
        const col = dataset.cols[i];
        const r = Math.random();
        if ( r > rColThreshold ) {
            colsIndex.push(i);
            cols.push(col);
        }
    }

    for (let i = 0; i < dataset.rows.length; i+=1) {
        const row = dataset.rows[i];
        const r = Math.random();
        if ( r > rRawThreshold ) {
            const newRow = row.filter( (o, index) => {
                return colsIndex.indexOf(index) >=0;
            });
            rows.push(newRow);
        }
    }
    result.cols = cols;
    result.rows = rows;
    return result;
}

function queryDataset(req, res) {
    const { id } = req.params;
    const newData = database.find(item => item.id === id);

    res.status(200).json(fakeQuery(newData));
}


export default {
    'GET /api/datasets': getDatasets,
    'GET /api/datasets/:id': getDataset,
    'POST /api/datasets/:id/query': queryDataset,
};