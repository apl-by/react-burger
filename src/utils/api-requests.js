const options = {
  headers: { "Content-type": "application/json" },
};

class ApiRequests {
  constructor(options) {
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMenu(url) {
    return fetch(url).then(this._handleResponse);
  }

  postOrder(url, data) {
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse);
  }
}

export const apiRequests = new ApiRequests(options);