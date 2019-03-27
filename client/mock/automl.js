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
        })
    }
    return list;
}

const jobs = fakeJobList(10);

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
    const job = jobs.find(item => item.id === id);
    res.status(200).json(job);
}

function createJob(req, res) {
    job = {...res}
    job.id = uuid.v4()
    jobs.push(job)
    res.status(200).json(job.id);
}

function deleteJob(req, res) {
    const { id } = req.params;
    jobs = jobs.filter(function(value, index, arr){
        return value.id == id;
    });
    res.status(200).json({});
}

export default {
    'GET /api/ml_jobs': getJobs,
    'GET /api/ml_jobs/:id': getJob,
    'POST /api/ml_jobs': createJob,
    'DELETE /api/ml_jobs/:id': deleteJob,
};