import styles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { sortData } from "../../utils/utils";
import { apiRequests } from "../../utils/api-requests";
import { BurgerContext } from "../../contexts/burger-context";

const App = () => {
  const [sortedMenu, setSortedMenu] = useState({
    bun: [],
    sauce: [],
    main: [],
  });

  useEffect(() => {
    apiRequests
      .getMenu()
      .then((res) => setSortedMenu(sortData(res.data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BurgerContext.Provider value={sortedMenu}>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>
    </BurgerContext.Provider>
  );
};

export default App;
