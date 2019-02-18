import Mock from 'mockjs';

import iris from './data/iris.json';
import diabetes from './data/diabetes.json';
import app_usage from './data/app_usage.json';
import churn from './data/churn.json';
import disk_failures from './data/disk_failures.json';


const database = [iris,diabetes,app_usage,churn,disk_failures]

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

function getDatasets(req, res) {
    let newData = database.map(function(item) {
        return {
            id: item.id,
            name: item.name
        };
    });
    res.status(200).json(newData);
}

function getDataset(req, res) {
    const { id } = req.params;

    let newData = database.find(item => item.id == id);
    if (newData) {
        res.status(200).json(newData);
    } else {
        // 404 is not handled by the request component ui now
        res.status(404).json(NOTFOUND);
    }
}


export default {
    'GET /api/datasets': getDatasets,
    'GET /api/datasets/:id': getDataset,
};