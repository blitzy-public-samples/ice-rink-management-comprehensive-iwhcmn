import { jest } from '@jest/globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createApiInstance, handleApiError, get, post, put, del } from '../../utils/api';
import { ApiResponse, ApiError } from '../../types';

jest.mock('axios');

describe('API Utility Functions', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('createApiInstance creates a valid Axios instance', () => {
    const instance = createApiInstance();
    expect(instance).toBeDefined();
    expect(instance.defaults.baseURL).toBe(process.env.NEXT_PUBLIC_API_BASE_URL);
    expect(instance.defaults.timeout).toBe(10000);
    expect(instance.interceptors.request).toBeDefined();
    expect(instance.interceptors.response).toBeDefined();
  });

  test('handleApiError returns a standardized ApiError object', () => {
    const mockError = {
      response: {
        status: 404,
        data: {
          message: 'Not Found',
        },
      },
    };

    const result = handleApiError(mockError);
    expect(result).toEqual({
      status: 404,
      message: 'Not Found',
      details: mockError.response.data,
    });
  });

  test('get function sends a GET request and returns ApiResponse', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockAxios.onGet('/test').reply(200, mockData);

    const result = await get('/test');
    expect(result).toEqual({
      success: true,
      data: mockData,
      error: null,
    });
  });

  test('post function sends a POST request and returns ApiResponse', async () => {
    const mockData = { id: 1, name: 'Test' };
    const postData = { name: 'Test' };
    mockAxios.onPost('/test', postData).reply(201, mockData);

    const result = await post('/test', postData);
    expect(result).toEqual({
      success: true,
      data: mockData,
      error: null,
    });
  });

  test('put function sends a PUT request and returns ApiResponse', async () => {
    const mockData = { id: 1, name: 'Updated Test' };
    const putData = { name: 'Updated Test' };
    mockAxios.onPut('/test/1', putData).reply(200, mockData);

    const result = await put('/test/1', putData);
    expect(result).toEqual({
      success: true,
      data: mockData,
      error: null,
    });
  });

  test('del function sends a DELETE request and returns ApiResponse', async () => {
    mockAxios.onDelete('/test/1').reply(204);

    const result = await del('/test/1');
    expect(result).toEqual({
      success: true,
      data: null,
      error: null,
    });
  });

  test('API functions handle errors correctly', async () => {
    const errorResponse = {
      status: 500,
      data: {
        message: 'Internal Server Error',
      },
    };
    mockAxios.onGet('/error').reply(500, errorResponse.data);
    mockAxios.onPost('/error').reply(500, errorResponse.data);
    mockAxios.onPut('/error').reply(500, errorResponse.data);
    mockAxios.onDelete('/error').reply(500, errorResponse.data);

    const expectedError: ApiError = {
      status: 500,
      message: 'Internal Server Error',
      details: errorResponse.data,
    };

    const getResult = await get('/error');
    expect(getResult).toEqual({
      success: false,
      data: null,
      error: expectedError,
    });

    const postResult = await post('/error', {});
    expect(postResult).toEqual({
      success: false,
      data: null,
      error: expectedError,
    });

    const putResult = await put('/error', {});
    expect(putResult).toEqual({
      success: false,
      data: null,
      error: expectedError,
    });

    const delResult = await del('/error');
    expect(delResult).toEqual({
      success: false,
      data: null,
      error: expectedError,
    });
  });
});

// Human tasks:
// - Implement additional test cases for edge cases and error scenarios
// - Add integration tests with a mock server to test real API interactions
// - Implement test coverage reporting and maintain high coverage