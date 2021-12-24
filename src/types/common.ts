export interface IMenuItem {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  _id: string;
  uniqueId?: string;
  __v?: number;
}

export interface ISortedMenu {
  bun: Array<IMenuItem>;
  sauce: Array<IMenuItem>;
  main: Array<IMenuItem>;
}

export interface IAllInputs<T> {
  name?: T;
  email?: T;
  password?: T;
  token?: T;
}

export type ErrorSetter = React.Dispatch<
  React.SetStateAction<{ [key: string]: boolean }>
>;

export interface ICustomInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  icon?: TIcons;
  placeholder?: string;
  size?: "default" | "small";
  disabled?: boolean;
  error: boolean;
  setError: ErrorSetter;
}

export interface ICookieOptions {
  expires?: Date | string | number;
  [`max-age`]?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export interface IMenuSection {
  id: number;
  section: string;
  key: string;
}

export type TIcons =
  | "CurrencyIcon"
  | "BurgerIcon"
  | "LockIcon"
  | "DragIcon"
  | "DeleteIcon"
  | "ArrowDownIcon"
  | "MenuIcon"
  | "CloseIcon"
  | "CheckMarkIcon"
  | "ListIcon"
  | "ProfileIcon"
  | "EditIcon"
  | "InfoIcon"
  | "ShowIcon"
  | "HideIcon"
  | "LogoutIcon";
