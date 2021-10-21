import styles from "./burger-ingredients.module.css";
import BurgIngrTabs from "./burg-ingr-tabs/burg-ingr-tabs";
import BurgIngrScroll from "./burg-ingr-scroll/burg-ingr-scroll";
import { menuSections } from "../../utils/data";
import { memo } from "react";

const BurgerIngredients = memo(() => {
  return (
    <section className={styles.ingredients}>
      <h1
        className={`${styles.ingredients__title} text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <BurgIngrTabs sections={menuSections} />
      <BurgIngrScroll sections={menuSections} />
    </section>
  );
});

export default BurgerIngredients;
