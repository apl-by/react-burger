import styles from "./BurgerIngredients.module.css";
import BurgerIngrTabs from "./BurgerIngrTabs/BurgerIngrTabs";
import BurgerIngrWindow from "./BurgerIngrWindow/BurgerIngrWindow";
import {menuSection} from "../../utils/data"
import cn from "classnames";

const BurgerIngredients = () => {
  const cnIngridientsTitle = cn(
    styles.ingridients__title,
    "text",
    "text_type_main-large",
    "mt-10",
    "mb-5"
  );
  return (
    <section className={styles.ingridients}>
      <h1 className={cnIngridientsTitle}>Соберите бургер</h1>
      <BurgerIngrTabs menu={menuSection} />
      <BurgerIngrWindow menu={menuSection} />
    </section>
  );
};

export default BurgerIngredients;
