import styles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BASE_URL_API } from "../../utils/data";
import { sortData } from "../../utils/utils";

const App = () => {
  const [sortedMenu, setSortedMenu] = useState({
    bun: [],
    sauce: [],
    main: [],
  });
  const [order, setOrder] = useState({ empty: true });

  // Захардкодил заполнение order для ревью.
  // В дальнейшем заполнять order после drag&drop
  useEffect(() => {
    if (sortedMenu.bun)
      setOrder({
        bun: sortedMenu.bun[0],
        ingridients: [...sortedMenu.sauce, ...sortedMenu.main],
        empty: false,
      });
  }, [sortedMenu]);

  useEffect(() => {
    fetch(BASE_URL_API)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => setSortedMenu(sortData(res.data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients menu={sortedMenu} />
        <BurgerConstructor order={order} />
      </main>
    </div>
  );
};

export default App;
