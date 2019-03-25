import uuid from 'uuid'

let jobs = [{
    "id": "b835191f-0167-4744-8661-84604bc58a22",
    "status": "SUCCESS",
    "type": "AutoClassificationJob",
    "name": "test_classification"
}, {
    "id": "3bc07ecb-a0c3-4065-ac7b-690cabc74894",
    "status": "SUCCESS",
    "type": "AutoClassificationJob",
    "name": "testregression"
}, {
    "id": "d5a8e1a2-b082-4b78-9f8d-effba5710699",
    "status": "SUCCESS",
    "type": "AutoClassificationJob",
    "name": "testclassification"
}, {
    "id": "3702c78c-98de-4c4a-86de-4d310a3f1318",
    "status": "SUCCESS",
    "type": "AutoClassificationJob",
    "name": "test_classification"
}, {
    "id": "29682567-ae4e-4490-902b-48056792b326",
    "status": "SUCCESS",
    "type": "AutoClassificationJob",
    "name": "test_classification"
}, {
    "id": "6e4e5065-428c-42ba-ae6c-3fd18ce9f6da",
    "status": "SUCCESS",
    "type": "AutoClassificationJob",
    "name": "test_classification"
}, {
    "id": "9cb5521c-a89d-4841-a397-d899a663d26e",
    "status": "SUCCESS",
    "type": "AutoClassificationJob",
    "name": "test_classification"
}]

function getJobs(req, res) {
    res.status(200).json(jobs);
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