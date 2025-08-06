function clientApi(baseUrl) {
  const BASE_URL = `${baseUrl}${baseUrl.at(-1) === '/' ? '' : '/'}`;

  async function _create(data) {
    const request = new Request(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }

  async function _read(queryString = '') {
    const request = new Request(`${BASE_URL}${queryString}`, {
      method: 'GET',
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }

  async function _update(id, data) {
    const request = new Request(`${BASE_URL}${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }

  async function _modify(id, data) {
    const request = new Request(`${BASE_URL}${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }

  async function _delete(id) {
    const request = new Request(`${BASE_URL}${id}`, {
      method: 'DELETE',
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }

  return {
    create: _create,
    read: _read,
    update: _update,
    modify: _modify,
    delete: _delete,
  };
}

export default clientApi;
