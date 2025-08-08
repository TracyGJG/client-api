function clientApi(baseUrl) {
  const BASE_URL = `${baseUrl}${baseUrl.at(-1) === '/' ? '' : '/'}`;

  async function issueRequest(url, opts) {
    const response = await fetch(url, opts);
    if (!response.ok) {
      throw Error(`Response status: ${response.status}`);
    }
    return await response.json();
  }

  return {
    create(data) {
      return issueRequest(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    read(queryString = '') {
      return issueRequest(`${BASE_URL}${queryString}`, {
        method: 'GET',
      });
    },
    update(id, data) {
      return issueRequest(`${BASE_URL}${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    modify(id, data) {
      return issueRequest(`${BASE_URL}${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
    delete(id) {
      return issueRequest(`${BASE_URL}${id}`, {
        method: 'DELETE',
      });
    },
  };
}

export default clientApi;
