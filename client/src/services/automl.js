import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryJobs(params) {
  return request(`/api/ml_jobs?${stringify(params)}`);
}

export async function queryJob(id) {
  const option = {};
  option.headers = { 'Cache-Control': 'no-cache' };
  return request(`/api/ml_jobs/${id}`, option);
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

export async function predict(params) {
  const { jobid, ...restParams } = params;
  return request(`/api/ml_jobs/${jobid}/predict`, {
    method: 'POST',
    body: restParams,
  });
}
