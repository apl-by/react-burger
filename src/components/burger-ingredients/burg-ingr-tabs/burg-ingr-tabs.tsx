import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burg-ingr-tabs.module.css";
import { FC } from "react";
import { IMenuSection } from "../../../types/common";

interface IBurgIngrTabs {
  sections: Array<IMenuSection>;
  tabIndex: number;
  onClick: (ind: number) => void;
}

const BurgIngrTabs: FC<IBurgIngrTabs> = ({ sections, tabIndex, onClick }) => {
  return (
    <div className={styles.tabs}>
      {sections.map((i) => (
        <Tab
          value={String(i.id)}
          active={tabIndex === i.id}
          onClick={() => onClick(i.id)}
          key={i.id}
        >
          {i.section}
        </Tab>
      ))}
    </div>
  );
};

export default BurgIngrTabs;
