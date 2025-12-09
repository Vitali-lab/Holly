export const apiRequest = async (url, { data, method = 'GET' } = {}) => {
  try {
    const headers = {};
    if (method !== 'GET' && method !== 'HEAD') {
      headers['Content-Type'] = 'application/json';
    }

    const options = {
      method,
      headers,
      credentials: 'include',
    };

    if (method !== 'GET' && method !== 'HEAD' && data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      let errorMessage = `Error ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch {
        errorMessage = await res.text();
      }
      throw new Error(errorMessage);
    }

    if (res.status === 204) return null;

    return await res.json();
  } catch (err) {
    console.error('API error:', err);
    throw err;
  }
};
