import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burg-ingr-tabs.module.css";
import PropTypes from "prop-types";
import { menuSectionPropType } from "../../../utils/prop-types";

const BurgIngrTabs = ({ sections, tabIndex, onClick }) => {
  return (
    <div className={styles.tabs}>
      {sections.map((i) => (
        <Tab
          value={i.id}
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

BurgIngrTabs.propTypes = {
  sections: PropTypes.arrayOf(menuSectionPropType),
  tabIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
