import mockjs from 'mockjs';
import iris from './data/iris.json';
import air_passengers from './data/air_passengers.json';  // eslint-disable-line camelcase
import nasdaq from './data/nasdaq.json';
import heat_sample from './data/heat_sample.json'; // eslint-disable-line camelcase


const {Random} = mockjs;

let database = [iris,air_passengers,nasdaq,heat_sample]; // eslint-disable-line camelcase

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

function getDatasets(req, res) {
    const newData = database.map(function(item) {
        return {
            id: item.id,
            name: item.name,
            type: 'csv',
            description: Random.paragraph()
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

function fakeQuery(dataset) {  // eslint-disable-line no-unused-vars
    if ( !dataset) {
        return {};
    }
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

    // res.status(200).json(fakeQuery(newData));
    // return all dataset for any query
    res.status(200).json(newData);
}

function uploadDataset(req, res) {
    res.status(200).json({});
}

function deleteDataset(req, res) {
    const { id } = req.params;
    database = database.filter(function(value){
        return value.id !== id;
    });
    res.status(204).json({});
}

function queryToDataset(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const { source_dataset_id,dataset_id,dataset_name,dataset_description } = body;  // eslint-disable-line camelcase
    const created_dataset = {...database[source_dataset_id]}; // eslint-disable-line camelcase
    created_dataset.id = dataset_id; // eslint-disable-line camelcase
    created_dataset.name = dataset_name; // eslint-disable-line camelcase
    created_dataset.dataset_description = dataset_description; // eslint-disable-line camelcase

    database.push(created_dataset);

    res.status(200).json(created_dataset);
}

export default {
    'GET /api/datasets': getDatasets,
    'GET /api/datasets/:id': getDataset,
    'POST /api/datasets/:id/query': queryDataset,
    'POST /api/dataset_upload': uploadDataset,
    'DELETE /api/datasets/:id': deleteDataset,
    'POST /api/query2dataset': queryToDataset,
};