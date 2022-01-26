import {
  IMenuItem,
  ISortedMenu,
  IAllInputs,
  ICookieOptions,
  IOrder,
  IHandeledOrder,
} from "../types/common";
import formatRelative from "date-fns/formatRelative";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import parseISO from "date-fns/parseISO";
import ru from "date-fns/locale/ru";

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

export const setTotalPrice = (
  bun: IMenuItem | null,
  ingrArr: IMenuItem[]
): number => {
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
  options: ICookieOptions
): void => {
  options = {
    path: "/",
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

export const handleOrder = (
  order: IOrder,
  menu: IMenuItem[]
): IHandeledOrder => {
  // установить статус
  const { _id, name, number } = order;
  const status =
    order.status === "created"
      ? "Создан"
      : order.status === "pending"
      ? "Готовится"
      : order.status === "done"
      ? "Выполнен"
      : "Не определен";

  // установить время
  const date = new Date();
  const orderDate = parseISO(order.createdAt);
  const diff = differenceInCalendarDays(date, orderDate);
  const signature =
    diff === 2 ? "2 дня назад," : diff === 3 ? "3 дня назад," : "P','";

  const formatRelativeLocale: { [key: string]: string } = {
    lastWeek: signature + " p 'i-'O",
    yesterday: "'Вчера,' p 'i-'O",
    today: "'Сегодня,' p 'i-'O",
    tomorrow: "'Завтра,' p 'i-'O",
    nextWeek: "P',' p 'i-'O",
    other: signature + " p 'i-'O",
  };

  const time = formatRelative(orderDate, date, {
    locale: {
      ...ru,
      formatRelative: (token: string) => formatRelativeLocale[token],
    },
  });

  // колличество уникальных ингредиентов
  const countIngr = order.ingredients.reduce(
    (obj: { [key: string]: number }, el: string) => {
      if (obj[el]) {
        obj[el] += 1;
      } else {
        obj[el] = 1;
      }
      return obj;
    },
    {}
  );

  // массив ингредиентов с данными
  const ingrForRender = Object.entries(countIngr)
    .map(([k, v]) => {
      const ingr = menu.find((el) => el._id === k);
      const clone = { ...ingr };
      if (clone) clone.count = v;
      return clone;
    })
    .filter((i) => i) as IMenuItem[];

  // суммарная цена
  const totalPrice = ingrForRender.reduce((total, value) => {
    return total + value.price * (value.count as number);
  }, 0);

  return {
    _id,
    name,
    number,
    status,
    time,
    ingrForRender,
    totalPrice,
  };
};
