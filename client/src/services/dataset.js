import request from '@/utils/request';

export async function queryDatasets() {
  return request('/api/datasets');
}

export async function queryDataset(id) {
  return request(`/api/datasets/${id}`);
}

export async function runDatasetQuery(params) {
  const { id = 0, ...restParams } = params;
  return request(`/api/datasets/${id}/query`,{
    method: 'POST',
    body: restParams,
  });
}
