export const sortData = (data) => {
  return data.reduce(
    (prev, i) => {
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

export const setOrderRequestBody = (order) => ({
  ingredients: [...order.map((i) => i._id)],
});

export const setTotalPrice = (bun, ingrArr) => {
  const ingrSum = ingrArr.reduce((prev, i) => prev + i.price, 0);
  return bun ? bun.price * 2 + ingrSum : ingrSum;
};

export const generateId = () => Math.random().toString(36).substr(2, 12);

export const hasEmptyInput = (data) =>
  Object.values(data).some((i) => i === "");

export const setErrInEmptyInput = (data) =>
  Object.fromEntries(
    Object.entries(data)
      .map(([k, v]) => (v === "" ? [k, true] : undefined))
      .filter((i) => i)
  );

export const hasErrorInput = (data) => Object.values(data).some((i) => i);

export const getCookie = (name) => {
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

export const setCookie = (name, value, options = {}) => {
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
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (...args) => {
  args.forEach((i) =>
    setCookie(i, "", {
      "max-age": -1,
    })
  );
};
