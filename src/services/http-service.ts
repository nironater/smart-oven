const server = 'http://localhost:3001';

export function getResource<T>(resource: string): Promise<T> {
  const res = makeRequest(resource, 'GET');
  return res;
};

export function setResource(resource: string): Promise<any> {
  const res = makeRequest(resource, 'PUT');
  return res;
};

export const makeRequest = (resource: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
  return fetch(`${server}/${resource}`, {method: method})
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Work with JSON data here
      console.log(`response: ${data}`);
      return data;
    })
    .catch(err => {
      // Do something for an error here
    })
};