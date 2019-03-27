import request from '@/utils/request';

export async function queryJobs(params) {
  return request('/api/ml_jobs?${stringify(params)}');
}

export async function queryJob(id) {
  return request(`/api/ml_jobs/${id}`);
}

export async function createJob(params) {
  return request(`/api/ml_jobs`, {
    method: 'POST',
    body: params,
  });
}

export async function deleteJob(id) {
  return request(`/api/ml_jobs/${id}`, {
    method: 'DELETE',
  });
}
