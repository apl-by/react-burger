import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burg-ingr-tabs.module.css";
import PropTypes from "prop-types";
import { menuSectionPropType } from "../../../utils/prop-types";

const BurgIngrTabs = ({ sections }) => {
  const [current, setCurrent] = useState(sections[0].id);
  return (
    <div className={styles.tabs}>
      {sections.map((i) => (
        <Tab
          value={i.id}
          active={current === i.id}
          onClick={setCurrent}
          key={i.id}
        >
          {i.section}
        </Tab>
      ))}
    </div>
  );
};

export default BurgIngrTabs;

BurgIngrTabs.propTypes = {
  sections: PropTypes.arrayOf(menuSectionPropType),
};
