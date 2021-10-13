import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngrTabs.module.css";


const BurgerIngrTabs = ({ menu }) => {
  const [current, setCurrent] = useState("one");
  return (
    <div className={styles.tabs}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        {menu[0].title}
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        {menu[1].title}
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        {menu[2].title}
      </Tab>
    </div>
  );
};

export default BurgerIngrTabs;