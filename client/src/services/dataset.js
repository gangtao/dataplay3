import request from '@/utils/request';

export async function queryDatasets() {
  return request('/api/datasets');
}

export async function queryDataset(id) {
  return request(`/api/datasets/${id}`);
}

export async function runDatasetQuery(params) {
  const { dataset , ...restParams } = params;
  return request(`/api/datasets/${dataset}/query`,{
    method: 'POST',
    body: restParams,
  });
}
