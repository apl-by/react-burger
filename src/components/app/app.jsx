import styles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { URL_GET_MENU } from "../../utils/data";
import { sortData } from "../../utils/utils";
import { apiRequests } from "../../utils/api-requests";
import { OrderContext } from "../../contexts/order-context";

const App = () => {
  const [sortedMenu, setSortedMenu] = useState({
    bun: [],
    sauce: [],
    main: [],
  });
  const [order, setOrder] = useState({ ingredients: [], empty: true });

  // Захардкодил заполнение order для ревью.
  // В дальнейшем заполнять order после drag&drop
  useEffect(() => {
    if (sortedMenu.bun)
      setOrder((order) => ({
        ...order,
        bun: sortedMenu.bun[0],
        ingredients: [...sortedMenu.sauce, ...sortedMenu.main],
        empty: false,
      }));
  }, [sortedMenu]);

  useEffect(() => {
    apiRequests
      .getMenu(URL_GET_MENU)
      .then((res) => setSortedMenu(sortData(res.data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.app}>
      <OrderContext.Provider value={order}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients menu={sortedMenu} />
          <BurgerConstructor />
        </main>
      </OrderContext.Provider>
    </div>
  );
};

export default App;
