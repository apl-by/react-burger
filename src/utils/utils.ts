import {
  IMenuItem,
  ISortedMenu,
  IAllInputs,
  ICookieOptions,
} from "../types/common";

export const sortData = (data: IMenuItem[]): ISortedMenu => {
  return data.reduce(
    (prev: ISortedMenu, i: IMenuItem) => {
      i.type === "bun"
        ? prev.bun.push(i)
        : i.type === "sauce"
        ? prev.sauce.push(i)
        : i.type === "main"
        ? prev.main.push(i)
        : void 0;

      return prev;
    },
    { bun: [], sauce: [], main: [] }
  );
};

export const setOrderRequestBody = (
  order: IMenuItem[]
): { ingredients: string[] } => ({
  ingredients: [...order.map((i: IMenuItem) => i._id)],
});

export const setTotalPrice = (bun: IMenuItem, ingrArr: IMenuItem[]): number => {
  const ingrSum = ingrArr.reduce(
    (prev: number, i: IMenuItem) => prev + i.price,
    0
  );
  return bun ? bun.price * 2 + ingrSum : ingrSum;
};

export const generateId = (): string =>
  Math.random().toString(36).substr(2, 12);

export const hasEmptyInput = (data: IAllInputs<string>): boolean =>
  Object.values(data).some((i: string) => i === "");

export const setErrInEmptyInput = (
  data: IAllInputs<string>
): IAllInputs<boolean> =>
  Object.fromEntries(
    Object.entries(data).map(([k, v]: [string, string]): [string, boolean] =>
      v === "" ? [k, true] : [k, false]
    )
  );

export const hasErrorInput = (data: IAllInputs<boolean>): boolean =>
  Object.values(data).some((i) => i);

export const getCookie = (name: string): string | undefined => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (
  name: string,
  value: string,
  options: ICookieOptions = { path: "/" }
): void => {
  options = {
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey as keyof ICookieOptions];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (...args: string[]): void => {
  args.forEach((i) =>
    setCookie(i, "", {
      "max-age": -1,
    })
  );
};
