import styles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BASE_URL_API } from "../../utils/data";
import { sortData } from "../../utils/utils";

const App = () => {
  const [sortedMenu, setSortedMenu] = useState([[], [], []]);
  const [order, setOrder] = useState({ bun: {}, ingridients: [], empty: true });

  // Захардкодил заполнение order для ревью.
  // В дальнейшем заполнять order после drag&drop 
  useEffect(() => {
    setOrder((order) => {
      return {
        ...order,
        bun: sortedMenu[0].length === 0 ? {} : sortedMenu[0][0],
        ingridients: [...order.ingridients, ...sortedMenu[1], ...sortedMenu[2]],
        empty: sortedMenu[0].length === 0 ? true : false,
      };
    });
  }, [sortedMenu]);

  useEffect(() => {
    fetch(BASE_URL_API)
      .then((res) => res.json())
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
