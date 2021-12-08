import { BASE_URL_API } from "./data";
import {
  IAllInputs,
  ICommonResBody,
  IAuthRes,
  IGetMenuRes,
  IPostOrderRes,
} from "../types/common";

interface IApiOptions {
  readonly _headers: { "Content-type": string };
  readonly _baseUrl: string;
}

type TJsonRes<T> = {
  ok: boolean;
  status: number;
  body: T;
};

const options: IApiOptions = {
  _headers: { "Content-type": "application/json" },
  _baseUrl: BASE_URL_API,
};

class ApiRequests implements IApiOptions {
  readonly _headers: { "Content-type": string };
  readonly _baseUrl: string;

  constructor(options: IApiOptions) {
    this._headers = options._headers;
    this._baseUrl = options._baseUrl;
  }

  private _handleResToJson<T>(res: Response): Promise<TJsonRes<T>> {
    return res.json().then((jsonRes: T) => ({
      ok: res.ok,
      status: res.status,
      body: jsonRes,
    }));
  }

  private _handleResponse<T extends { message?: string }>(
    res: TJsonRes<T>
  ): T | Promise<never> {
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
      .then((res) => this._handleResToJson<IGetMenuRes>(res))
      .then((res) => this._handleResponse<IGetMenuRes>(res));
  }

  postOrder(data: { ingredients: string[] }) {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._handleResToJson<IPostOrderRes>(res))
      .then((res) => this._handleResponse<IPostOrderRes>(res));
  }

  confirmEmail(email: Pick<IAllInputs<string>, "email">) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(email),
    })
      .then((res) => this._handleResToJson<Required<ICommonResBody>>(res))
      .then((res) => this._handleResponse<Required<ICommonResBody>>(res));
  }

  resetPassword(data: Pick<IAllInputs<string>, "password" | "token">) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._handleResToJson<Required<ICommonResBody>>(res))
      .then((res) => this._handleResponse<Required<ICommonResBody>>(res));
  }

  login(data: Pick<IAllInputs<string>, "email" | "password">) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._handleResToJson<IAuthRes>(res))
      .then((res) => this._handleResponse<IAuthRes>(res));
  }

  register(data: Pick<IAllInputs<string>, "email" | "password" | "name">) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._handleResToJson<IAuthRes>(res))
      .then((res) => this._handleResponse<IAuthRes>(res));
  }

  logout(token: string) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token }),
    })
      .then((res) => this._handleResToJson<Required<ICommonResBody>>(res))
      .then((res) => this._handleResponse<Required<ICommonResBody>>(res));
  }

  refreshToken(token: string) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token }),
    })
      .then((res) => this._handleResToJson<IAuthRes>(res))
      .then((res) => this._handleResponse<IAuthRes>(res));
  }

  getUser(token: string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => this._handleResToJson<IAuthRes>(res))
      .then((res) => this._handleResponse<IAuthRes>(res));
  }

  patchUser(
    token: string,
    data: Partial<Pick<IAllInputs<string>, "email" | "password" | "name">>
  ) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => this._handleResToJson<IAuthRes>(res))
      .then((res) => this._handleResponse<IAuthRes>(res));
  }
}

export const apiRequests = new ApiRequests(options);
