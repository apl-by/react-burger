import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burg-ingr-tabs.module.css";

const BurgIngrTabs = ({ menu }) => {
  const [current, setCurrent] = useState(menu[0].id);
  return (
    <div className={styles.tabs}>
      {menu.map((i) => (
        <Tab
          value={i.id}
          active={current === i.id}
          onClick={setCurrent}
          key={i.id}
        >
          {i.title}
        </Tab>
      ))}
    </div>
  );
};

export default BurgIngrTabs;
