const request = (url, method, headers, body) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...headers,
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  }).then((response) => handleResponse(response));
};

const handleResponse = (response) => {
  const emptyResponse =
    response.body === null || response.headers.get("Content-length") === "0";
  if (!response.ok) {
    return emptyResponse
      ? Promise.reject(response.statusText)
      : response.json().then((json) => {
          throw new Error(
            json.type || json.exceptionMsg || response.statusText
          );
        });
  }

  return emptyResponse ? Promise.resolve({}) : response.json();
};

export const getRequest = (url, body, headers) =>
  request(url, "GET", headers, body);

export const postRequest = (url, body, headers) =>
  request(url, "POST", headers, body);

export const patchRequest = (url, body, headers) =>
  request(url, "PATCH", headers, body);
