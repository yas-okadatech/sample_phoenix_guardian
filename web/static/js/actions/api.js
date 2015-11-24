export const METHOD_GET = "get";
export const METHOD_POST = "post";
export const METHOD_PUT = "put";

export function createApiMeta(url, params, method = METHOD_GET) {
  return {
    api: {
      url: url,
      params: params,
      method: method
    }
  }
}
