import request from '@/utils/request';

export async function listDashboards() {
  return request('/api/dashboards');
}

export async function queryDashboard(id) {
  return request(`/api/dashboards/${id}`);
}

export async function createDashboard(params) {
  const { restParams } = params;
  return request(`/api/dashboards`, {
    method: 'POST',
    body: restParams,
  });
}

export async function deleteDashboard(id) {
  return request(`/api/dashboards/${id}`, {
    method: 'DELETE',
  });
}
