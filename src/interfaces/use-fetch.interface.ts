type FetchMethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
type FetchBodyType = string | Blob | FormData | null;
type FetchResponseType = 'json' | 'text' | 'blob';

export interface FetchOptions {
  method?: FetchMethodType;
  headers?: Record<string, string>;
  body?: FetchBodyType;
  responseType?: FetchResponseType;
}
