import styles from "./burger-ingredients.module.css";
import BurgIngrTabs from "./burg-ingr-tabs/burg-ingr-tabs";
import BurgIngrScroll from "./burg-ingr-scroll/burg-ingr-scroll";
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
      <BurgIngrTabs menu={menuSection} />
      <BurgIngrScroll menu={menuSection} />
    </section>
  );
};

export default BurgerIngredients;