import request from '@/utils/request';

export async function queryDatasets() {
  return request('/api/datasets');
}

export async function queryDataset(id) {
  return request(`/api/datasets/${id}`);
}
