import request from '@/utils/request';

export async function listConfigs() {
  return request('/api/confs');
}

export async function getConfig(domain) {
  return request(`/api/confs/${domain}`);
}

export async function saveConfig(params) {
  const { domain, value } = params;
  return request(`/api/confs/${domain}`, {
    method: 'POST',
    body: value,
  });
}
