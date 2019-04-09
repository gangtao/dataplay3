import uuid from 'uuid';
import mockjs from 'mockjs';
import { parse } from 'url';

const {Random} = mockjs;

Random.extend({
    jobStatus(date) {
        const status = ['INITIALIZED','TRAINING','VALIDATING','SUCCESS','FAILED'];
        return this.pick(status);
    },
    jobType(date) {
        const type = ['AutoClassificationJob','AutoRegressionJob','TimeSerialsForecastsJob'];
        return this.pick(type);
    }
})

function fakeJobList(count) {
    const list = [];
    for (let i = 0; i < count; i += 1) {
        list.push({
            id: uuid.v4(),
            status: Random.jobStatus(),
            type: Random.jobType(),
            name: Random.word(),
            start_time: new Date().getTime() / 1000,
        })
    }
    return list;
}

let jobs = fakeJobList(10);

const regressionJobDetails = {
    "dataset_id": "housing",
    "job_option": {
        "time_left_for_this_task": 30,
        "per_run_time_limit": 10,
        "initial_configurations_via_metalearning": 25,
        "ensemble_size": 50,
        "ensemble_nbest": 50,
        "ensemble_memory_limit": 1024,
        "ml_memory_limit": 2048,
        "tmp_folder": "\/tmp\/dataplay\/mljobs\/8205f310-8bf7-4a14-869b-1177b49f46cd\/tmp",
        "output_folder": "\/tmp\/dataplay\/mljobs\/8205f310-8bf7-4a14-869b-1177b49f46cd\/output"
    },
    "validation_option": {
        "test_size": 0.1,
        "random_state": 42,
        "shuffle": true
    },
    "features": ["crime_rate", "business_acres", "avg_rooms_per_dwelling", "distance_to_employment_center"],
    "targets": ["median_house_value"],
    "validation_result": {
        "r2": 0.6618103002,
        "mean_squared_error": 37.074986561,
        "mean_absolute_error": 3.7652134675,
        "median_absolute_error": 3.0310683823
    },
    "status": "SUCCESS"
}

const classificationJobDetail = {
    "dataset_id": "churn",
    "job_option": {
        "time_left_for_this_task": 30,
        "per_run_time_limit": 10,
        "initial_configurations_via_metalearning": 25,
        "ensemble_size": 50,
        "ensemble_nbest": 50,
        "ensemble_memory_limit": 1024,
        "ml_memory_limit": 2048,
        "tmp_folder": "\/tmp\/dataplay\/mljobs\/8a57d51f-017b-442e-a2fe-54d3de851915\/tmp",
        "output_folder": "\/tmp\/dataplay\/mljobs\/8a57d51f-017b-442e-a2fe-54d3de851915\/output"
    },
    "validation_option": {
        "test_size": 0.1,
        "random_state": 42,
        "shuffle": true
    },
    "features": ["Account Length", "Area Code", "Day Calls", "State"],
    "targets": ["Churn?"],
    "validation_result": {
        "accuracy": 0.8383233533
    },
    "status": "SUCCESS"
}

const timeForcastJobDetails = {
    "dataset_id": "air_passengers",
    "job_option": {
        "time_format": null
    },
    "features": ["Date"],
    "targets": ["Number"],
    "start_time": 1554777282.3254179955,
    "end_time": 1554777282.4133169651,
    "status": "SUCCESS"
}

const fakePrediction = {
    "cols": ["sepal_length", "sepal_width", "petal_length", "petal_width", "species", "prediction"],
    "rows": [
        [5.1, 3.5, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.9, 3.0, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.7, 3.2, 1.3, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.6, 3.1, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.6, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.9, 1.7, 0.4, "Iris Setosa", "Iris Setosa"],
        [4.6, 3.4, 1.4, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.4, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.4, 2.9, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.9, 3.1, 1.5, 0.1, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.7, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.4, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.0, 1.4, 0.1, "Iris Setosa", "Iris Setosa"],
        [4.3, 3.0, 1.1, 0.1, "Iris Setosa", "Iris Setosa"],
        [5.8, 4.0, 1.2, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.7, 4.4, 1.5, 0.4, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.9, 1.3, 0.4, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.5, 1.4, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.7, 3.8, 1.7, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.8, 1.5, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.4, 1.7, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.7, 1.5, 0.4, "Iris Setosa", "Iris Setosa"],
        [4.6, 3.6, 1.0, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.3, 1.7, 0.5, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.4, 1.9, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.0, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.4, 1.6, 0.4, "Iris Setosa", "Iris Setosa"],
        [5.2, 3.5, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.2, 3.4, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.7, 3.2, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.1, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.4, 1.5, 0.4, "Iris Setosa", "Iris Setosa"],
        [5.2, 4.1, 1.5, 0.1, "Iris Setosa", "Iris Setosa"],
        [5.5, 4.2, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.9, 3.1, 1.5, 0.1, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.2, 1.2, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.5, 3.5, 1.3, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.9, 3.1, 1.5, 0.1, "Iris Setosa", "Iris Setosa"],
        [4.4, 3.0, 1.3, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.4, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.5, 1.3, 0.3, "Iris Setosa", "Iris Setosa"],
        [4.5, 2.3, 1.3, 0.3, "Iris Setosa", "Iris Setosa"],
        [4.4, 3.2, 1.3, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.5, 1.6, 0.6, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.8, 1.9, 0.4, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.0, 1.4, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.8, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.6, 3.2, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.3, 3.7, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.3, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [7.0, 3.2, 4.7, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [6.4, 3.2, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.9, 3.1, 4.9, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.3, 4.0, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.5, 2.8, 4.6, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 2.8, 4.5, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.3, 3.3, 4.7, 1.6, "Iris Versicolor", "Iris Versicolor"],
        [4.9, 2.4, 3.3, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [6.6, 2.9, 4.6, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.2, 2.7, 3.9, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [5.0, 2.0, 3.5, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [5.9, 3.0, 4.2, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.0, 2.2, 4.0, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [6.1, 2.9, 4.7, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 2.9, 3.6, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.7, 3.1, 4.4, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 3.0, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.8, 2.7, 4.1, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [6.2, 2.2, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 2.5, 3.9, 1.1, "Iris Versicolor", "Iris Versicolor"],
        [5.9, 3.2, 4.8, 1.8, "Iris Versicolor", "Iris Versicolor"],
        [6.1, 2.8, 4.0, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.3, 2.5, 4.9, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.1, 2.8, 4.7, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [6.4, 2.9, 4.3, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.6, 3.0, 4.4, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [6.8, 2.8, 4.8, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [6.7, 3.0, 5.0, 1.7, "Iris Versicolor", "Iris Versicolor"],
        [6.0, 2.9, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 2.6, 3.5, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.4, 3.8, 1.1, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.4, 3.7, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [5.8, 2.7, 3.9, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [6.0, 2.7, 5.1, 1.6, "Iris Versicolor", "Iris Virginica"],
        [5.4, 3.0, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.0, 3.4, 4.5, 1.6, "Iris Versicolor", "Iris Versicolor"],
        [6.7, 3.1, 4.7, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.3, 2.3, 4.4, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 3.0, 4.1, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.5, 4.0, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.6, 4.4, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [6.1, 3.0, 4.6, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [5.8, 2.6, 4.0, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [5.0, 2.3, 3.3, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 2.7, 4.2, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 3.0, 4.2, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 2.9, 4.2, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.2, 2.9, 4.3, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.1, 2.5, 3.0, 1.1, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 2.8, 4.1, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.3, 3.3, 6.0, 2.5, "Iris Virginica", "Iris Virginica"],
        [5.8, 2.7, 5.1, 1.9, "Iris Virginica", "Iris Virginica"],
        [7.1, 3.0, 5.9, 2.1, "Iris Virginica", "Iris Virginica"],
        [6.3, 2.9, 5.6, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.5, 3.0, 5.8, 2.2, "Iris Virginica", "Iris Virginica"],
        [7.6, 3.0, 6.6, 2.1, "Iris Virginica", "Iris Virginica"],
        [4.9, 2.5, 4.5, 1.7, "Iris Virginica", "Iris Virginica"],
        [7.3, 2.9, 6.3, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.7, 2.5, 5.8, 1.8, "Iris Virginica", "Iris Virginica"],
        [7.2, 3.6, 6.1, 2.5, "Iris Virginica", "Iris Virginica"],
        [6.5, 3.2, 5.1, 2.0, "Iris Virginica", "Iris Virginica"],
        [6.4, 2.7, 5.3, 1.9, "Iris Virginica", "Iris Virginica"],
        [6.8, 3.0, 5.5, 2.1, "Iris Virginica", "Iris Virginica"],
        [5.7, 2.5, 5.0, 2.0, "Iris Virginica", "Iris Virginica"],
        [5.8, 2.8, 5.1, 2.4, "Iris Virginica", "Iris Virginica"],
        [6.4, 3.2, 5.3, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.5, 3.0, 5.5, 1.8, "Iris Virginica", "Iris Virginica"],
        [7.7, 3.8, 6.7, 2.2, "Iris Virginica", "Iris Virginica"],
        [7.7, 2.6, 6.9, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.0, 2.2, 5.0, 1.5, "Iris Virginica", "Iris Virginica"],
        [6.9, 3.2, 5.7, 2.3, "Iris Virginica", "Iris Virginica"],
        [5.6, 2.8, 4.9, 2.0, "Iris Virginica", "Iris Virginica"],
        [7.7, 2.8, 6.7, 2.0, "Iris Virginica", "Iris Virginica"],
        [6.3, 2.7, 4.9, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.7, 3.3, 5.7, 2.1, "Iris Virginica", "Iris Virginica"],
        [7.2, 3.2, 6.0, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.2, 2.8, 4.8, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.1, 3.0, 4.9, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.4, 2.8, 5.6, 2.1, "Iris Virginica", "Iris Virginica"],
        [7.2, 3.0, 5.8, 1.6, "Iris Virginica", "Iris Virginica"],
        [7.4, 2.8, 6.1, 1.9, "Iris Virginica", "Iris Virginica"],
        [7.9, 3.8, 6.4, 2.0, "Iris Virginica", "Iris Virginica"],
        [6.4, 2.8, 5.6, 2.2, "Iris Virginica", "Iris Virginica"],
        [6.3, 2.8, 5.1, 1.5, "Iris Virginica", "Iris Virginica"],
        [6.1, 2.6, 5.6, 1.4, "Iris Virginica", "Iris Virginica"],
        [7.7, 3.0, 6.1, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.3, 3.4, 5.6, 2.4, "Iris Virginica", "Iris Virginica"],
        [6.4, 3.1, 5.5, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.0, 3.0, 4.8, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.9, 3.1, 5.4, 2.1, "Iris Virginica", "Iris Virginica"],
        [6.7, 3.1, 5.6, 2.4, "Iris Virginica", "Iris Virginica"],
        [6.9, 3.1, 5.1, 2.3, "Iris Virginica", "Iris Virginica"],
        [5.8, 2.7, 5.1, 1.9, "Iris Virginica", "Iris Virginica"],
        [6.8, 3.2, 5.9, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.7, 3.3, 5.7, 2.5, "Iris Virginica", "Iris Virginica"],
        [6.7, 3.0, 5.2, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.3, 2.5, 5.0, 1.9, "Iris Virginica", "Iris Virginica"],
        [6.5, 3.0, 5.2, 2.0, "Iris Virginica", "Iris Virginica"],
        [6.2, 3.4, 5.4, 2.3, "Iris Virginica", "Iris Virginica"],
        [5.9, 3.0, 5.1, 1.8, "Iris Virginica", "Iris Virginica"]
    ]
}

function getJobs(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;
    if ( params.type ) {
        const job = jobs.filter(item => {
            return item.type === params.type
        });
        res.status(200).json(job);
    } else {
        res.status(200).json(jobs);
    } 
}

function getJob(req, res) {
    const { id } = req.params;
    let job = jobs.find(item => item.id === id);
    if ( job.type == 'AutoClassificationJob') {
        job = { ...job, ...classificationJobDetail};
    } else if ( job.type == 'AutoRegressionJob' ) {
        job = { ...job, ...regressionJobDetails};
    } else if ( job.type == 'TimeSerialsForecastsJob' ) {
        job = { ...job, ...timeForcastJobDetails};
    }

    job.status = Random.jobStatus();
    res.status(200).json(job);
}

function createJob(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const job = {...body};
    job.id = uuid.v4();
    job.status = Random.jobStatus();
    job.start_time = new Date().getTime() / 1000;
    jobs.push(job);
    res.status(200).json(job);
}

function deleteJob(req, res) {
    const { id } = req.params;
    jobs = jobs.filter(function(value, index, arr){
        return value.id !== id;
    });
    res.status(204).json({});
}

function predict(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const payload = {...body};
    res.status(200).json(fakePrediction);
}

export default {
    'GET /api/ml_jobs': getJobs,
    'GET /api/ml_jobs/:id': getJob,
    'POST /api/ml_jobs': createJob,
    'DELETE /api/ml_jobs/:id': deleteJob,
    'POST /api/ml_jobs/:id/predict': predict,
};