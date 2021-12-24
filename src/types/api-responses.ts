import { IMenuItem } from "./common";

// Типы body-ответов на api запросы

export interface IGetMenuRes {
  success: boolean;
  data: Array<IMenuItem>;
  message?: string;
}

export interface IPostOrderRes {
  success: boolean;
  name: string;
  order: { number: number };
  message?: string;
}

export interface IAuthRes {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: { email: string; name: string };
  message?: string;
}

export interface IUserRes {
  success: boolean;
  user: { email: string; name: string };
  message?: string;
}

export interface IRefreshTokenRes {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export interface ICommonResBody {
  success: boolean;
  message: string;
}
