import { API_URL } from '@/api/rest';

interface Options {
  method?: string;
  headers?: RequestInit['headers'];
  body?: Record<string, any>;
}

export type ResponseData<T> = T extends { data: infer U }
  ? {
      data: U;
    }
  : {
      data: any;
    };

export class HttpClientService {
  baseURL: Required<string>;
  defaultHeaders: Required<Options['headers']>;

  constructor(baseURL: string, defaultHeaders: Options['headers']) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  async request<T>(url: string, options: Options = {}): Promise<ResponseData<T>> {
    const { method = 'GET', headers = {}, body } = options;
    const withBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    const bodyObject =
      'Content-Type' in headers && headers['Content-Type'] === 'application/json'
        ? JSON.stringify(body)
        : body;

    const response = await fetch(`${this.baseURL}${url}`, {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      } as RequestInit['headers'],
      ...(withBody && { body: bodyObject as BodyInit }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    return { data } as ResponseData<T>;
  }

  async get(url: string, headers = this.defaultHeaders) {
    return this.request(url, {
      method: 'GET',
      headers,
    });
  }

  async post<PostResponse>(url: string, body: Record<string, any>, headers = this.defaultHeaders) {
    return this.request<PostResponse>(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    });
  }

  async put<PutResponse>(url: string, body: Record<string, any>, headers = {}) {
    return this.request<PutResponse>(`${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    });
  }

  async delete<DeleteResponse>(url: string, headers = {}) {
    return this.request<DeleteResponse>(`${url}`, {
      method: 'DELETE',
      headers,
    });
  }

  async uploadFile<UploadResponse>(url: string, body: Options['body'], headers = {}) {
    return this.request<UploadResponse>(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
      body,
    });
  }
}

const httpClient = new HttpClientService(API_URL, {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
});

export { httpClient };
