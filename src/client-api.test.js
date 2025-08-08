import { describe, expect, test, vi, afterEach, beforeEach } from 'vitest';

import ClientApi from './client-api.js';

describe('Client API module', () => {
  let errorHandler = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('to be a function', () => {
    expect(typeof ClientApi).toBe('function');
  });

  describe('returns five CRUD methods when called', () => {
    test('using a url not ending with back-slash', () => {
      const methods = ClientApi('testUrl', errorHandler);

      expect(Object.keys(methods).length).toBe(5);
      expect(methods.create).toBeDefined();
      expect(methods.read).toBeDefined();
      expect(methods.update).toBeDefined();
      expect(methods.modify).toBeDefined();
      expect(methods.delete).toBeDefined();
    });

    test('using a url ending with back-slash', () => {
      const methods = ClientApi('testUrl/', errorHandler);

      expect(Object.keys(methods).length).toBe(5);
      expect(methods.create).toBeDefined();
      expect(methods.read).toBeDefined();
      expect(methods.update).toBeDefined();
      expect(methods.modify).toBeDefined();
      expect(methods.delete).toBeDefined();
    });
  });

  describe('using the create method', () => {
    const methods = ClientApi('http://testUrl', errorHandler);

    afterEach(() => {
      fetch.resetMocks();
    });

    test('can add a new record', async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

      expect(fetch.requests().length).toEqual(0);

      expect(await methods.create({ hello: 'world' })).toStrictEqual({
        data: '12345',
      });

      expect(fetch.requests().length).toEqual(1);
      expect(fetch.requests()[0].method).toEqual('POST');
      expect(fetch.requests()[0].url).toEqual('http://testurl/');
    });

    test('will through an exception when a request fails', async () => {
      fetch.mockResponseOnce({ body: 'ok', status: 500 });

      expect(fetch.requests().length).toEqual(0);
      expect(errorHandler).toHaveBeenCalledTimes(0);

      await methods.create({ hello: 'world' });

      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(errorHandler).toHaveBeenLastCalledWith({
        status: 500,
        statusText: '',
      });
      expect(fetch.requests().length).toEqual(1);
      expect(fetch.requests()[0].method).toEqual('POST');
      expect(fetch.requests()[0].url).toEqual('http://testurl/');
    });
  });

  describe('using the read method', () => {
    const methods = ClientApi('http://testUrl', errorHandler);

    afterEach(() => {
      fetch.resetMocks();
    });

    test('can retrieve a record, without a queryString', async () => {
      fetch.mockResponseOnce(
        JSON.stringify([{ data: '12345' }, { data: '67890' }])
      );

      expect(fetch.requests().length).toEqual(0);

      expect(await methods.read()).toStrictEqual([
        { data: '12345' },
        { data: '67890' },
      ]);

      expect(fetch.requests().length).toEqual(1);
      expect(fetch.requests()[0].method).toEqual('GET');
      expect(fetch.requests()[0].url).toEqual('http://testurl/');
    });

    test('can retrieve a record, with a queryString', async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

      expect(fetch.requests().length).toEqual(0);

      expect(await methods.read('?data=12345')).toStrictEqual({
        data: '12345',
      });

      expect(fetch.requests().length).toEqual(1);
      expect(fetch.requests()[0].method).toEqual('GET');
      expect(fetch.requests()[0].url).toEqual('http://testurl/?data=12345');
    });
  });

  describe('using the update method', () => {
    const methods = ClientApi('http://testUrl', errorHandler);

    afterEach(() => {
      fetch.resetMocks();
    });

    test('can change a complete record', async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '67890' }));

      expect(fetch.requests().length).toEqual(0);

      expect(await methods.update(1, { data: '67890' })).toStrictEqual({
        data: '67890',
      });

      expect(fetch.requests().length).toEqual(1);
      expect(fetch.requests()[0].method).toEqual('PUT');
      expect(fetch.requests()[0].url).toEqual('http://testurl/1');
    });
  });

  describe('using the modify method', () => {
    const methods = ClientApi('http://testUrl', errorHandler);

    afterEach(() => {
      fetch.resetMocks();
    });

    test('can change a partial record', async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '67890' }));

      expect(fetch.requests().length).toEqual(0);

      expect(await methods.modify(1, { data: '67890' })).toStrictEqual({
        data: '67890',
      });

      expect(fetch.requests().length).toEqual(1);
      expect(fetch.requests()[0].method).toEqual('PATCH');
      expect(fetch.requests()[0].url).toEqual('http://testurl/1');
    });
  });

  describe('using the delete method', () => {
    const methods = ClientApi('http://testUrl', errorHandler);

    afterEach(() => {
      fetch.resetMocks();
    });

    test('can delete a record', async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '67890' }));

      expect(fetch.requests().length).toEqual(0);

      expect(await methods.delete(1)).toStrictEqual({
        data: '67890',
      });

      expect(fetch.requests().length).toEqual(1);
      expect(fetch.requests()[0].method).toEqual('DELETE');
      expect(fetch.requests()[0].url).toEqual('http://testurl/1');
    });
  });
});
