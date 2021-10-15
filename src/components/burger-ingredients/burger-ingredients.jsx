import styles from "./burger-ingredients.module.css";
import BurgIngrTabs from "./burg-ingr-tabs/burg-ingr-tabs";
import BurgIngrScroll from "./burg-ingr-scroll/burg-ingr-scroll";
import { menuSections } from "../../utils/data";
import PropTypes from "prop-types";
import { cardPropTypes } from "../../utils/prop-types";

const BurgerIngredients = ({ menu }) => {
  return (
    <section className={styles.ingridients}>
      <h1
        className={`${styles.ingridients__title} text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <BurgIngrTabs sections={menuSections} />
      <BurgIngrScroll sections={menuSections} menu={menu} />
    </section>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.arrayOf(cardPropTypes)),
};
