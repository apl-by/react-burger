import { BASE_URL_API } from "./data";

const options = {
  headers: { "Content-type": "application/json" },
  baseUrl: BASE_URL_API,
};

class ApiRequests {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMenu() {
    return fetch(`${this._baseUrl}/ingredients`).then(this._handleResponse);
  }

  postOrder(data) {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
}

export const apiRequests = new ApiRequests(options);