export default class StoreBase {
  constructor(isDev) {
    // boolean
    this.isDev = isDev;
  }

  baseUrl() {
    if (this.isDev) {
      return "https://gm7o2xoumj.execute-api.us-east-1.amazonaws.com/dev";
    } else {
      return "https://v189wwdfoi.execute-api.us-east-1.amazonaws.com/prod";
    }
  }

  makeRequest(method, url, extra) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      let requestBody = null;
      if (method === "POST" && extra && extra.body) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        requestBody = extra.body;
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(requestBody);
    });
  }
}