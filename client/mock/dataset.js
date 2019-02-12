import Mock from 'mockjs';

let datasetId = 0;
let database = []
for (let i =0; i < 5 ; i++) {
    const template = {
        id() {
            datasetId += 1;
            return datasetId;
        },
        name: '@word(3,10)',
        cols: Mock.mock({
            'data|5': ['@word(3,10)']
        }).data,
        // TODO: this will actually generate duplicated rows
        rows: Mock.mock({
            'data|100': [Mock.mock({
                'data|5': ['@integer(0,100)']
            }).data]
        }).data,
    }
    database[i] = Mock.mock(template);
}

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