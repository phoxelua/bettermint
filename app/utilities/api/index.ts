import "whatwg-fetch";

interface IRequestParameters {
  url: string;
  data?: any;
  method: string;
}

async function request({ url, data, method }: IRequestParameters) {
  try {
    const req: RequestInit = {
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    };

    if (data) {
      let body: any;

      if (data instanceof FormData) {
        body = data;
      } else {
        body = JSON.stringify(data);
      }

      req["body"] = body;
    }

    const authToken = localStorage.getItem("token");
    if (authToken) {
      req.headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, req);
    const contentType = response.headers.get("content-type");

    if (response.status < 200 || response.status >= 400) {
      const error = Error("API Error");
      error.message = await response.json();
      throw error;
    }

    if (response.status === 200 && contentType.indexOf("application/json") !== -1) {
      const result = await response.json();
      return result;
    }

    return -1;
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    console.error(JSON.stringify(await err.response.json())); // eslint-disable-line no-console
    throw err;
  }
}

export function get(url: string): Promise<any> {
  return request({ url, method: "get" });
}

export function post(url: string, data: any): Promise<any> {
  return request({ url, data, method: "post" });
}

export function put(url: string, data: any): Promise<any> {
  return request({ url, data, method: "put" });
}

export function del(url: string): Promise<any> {
  return request({ url, method: "delete" });
}
