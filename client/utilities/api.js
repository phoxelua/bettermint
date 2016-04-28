import 'whatwg-fetch';

async function request({ url, data, params={}, authToken=null }) {
  try {
    let body;

    if (data) {
      if (data instanceof FormData) {
        body = data;
      } else {
        body = JSON.stringify(data);
      }
    }

    const req = {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
      ...params,
    };

    if (authToken) {
      req.headers.Authorization = `Bearer ${authToken}`;
    }

    const response = await fetch(url, req);
    const contentType = response.headers.get('content-type');

    if (response.status < 200 || response.status >= 400) {
      const error = Error('API Error');
      console.log(response);
      error.response = response;
      throw error;
    }

    if (response.status === 200 && contentType.indexOf('application/json') !== -1) {
      const result = await response.json();
      return result.data;
    }

    return -1;
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    console.error(JSON.stringify(await err.response.json())); // eslint-disable-line no-console
    throw err;
  }
}

export function get(url, authToken) {
  return request({ url, authToken });
}

export function post(url, data, authToken) {
  return request({ url, data, params: { method: 'post' }, authToken });
}

export function del(url, authToken) {
  return request({ url, params: { method: 'delete' }, authToken });
}
