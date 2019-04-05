import uuid from 'uuid';
import mockjs from 'mockjs';
import { parse } from 'url';

const Random = mockjs.Random;

Random.extend({
    jobStatus: function(date) {
        const status = ['INITIALIZED','TRAINING','VALIDATING','SUCCESS','FAILED'];
        return this.pick(status);
    },
    jobType: function(date) {
        const type = ['AutoClassificationJob','AutoRegressionJob'];
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
            start_time: new Date().getTime(),
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
    }
    job.status = Random.jobStatus();
    res.status(200).json(job);
}

function createJob(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const job = {...body};
    job.id = uuid.v4();
    job.status = Random.jobStatus();
    job.start_time = new Date().getTime();
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

export default {
    'GET /api/ml_jobs': getJobs,
    'GET /api/ml_jobs/:id': getJob,
    'POST /api/ml_jobs': createJob,
    'DELETE /api/ml_jobs/:id': deleteJob,
};