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

  _handleResToJson(res) {
    return res
      .json()
      .then((result) => ({ ok: res.ok, status: res.status, body: result }));
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.body;
    }
    return Promise.reject({
      status: res.status,
      message: res.body.message,
    });
  }

  getMenu() {
    return fetch(`${this._baseUrl}/ingredients`)
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  postOrder(data) {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  confirmEmail(email) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(email),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  resetPassword(data) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  login(data) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  register(data) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  logout(data) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  refreshToken(token) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token }),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  getUser(token) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        Authorization: "Bearer " + token,
      },
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }
}

export const apiRequests = new ApiRequests(options);
