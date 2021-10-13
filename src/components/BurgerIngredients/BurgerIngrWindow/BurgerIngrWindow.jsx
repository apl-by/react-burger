import styles from "./BurgerIngrWindow.module.css";
import BurgerIngrCard from "./BurgerIngrCard/BurgerIngrCard";
import cn from "classnames";
import { data } from "../../../utils/data";
import { sortData } from "../../../utils/utils";

const BurgerIngrWindow = ({ menu }) => {
  const cnCards = cn(styles.cards, "pr-4", "pl-4");
  const cnBlockTitle = cn(
    styles.block__title,
    "mt-10",
    "mb-6",
    "text",
    "text_type_main-medium"
  );

  const [bun, sauce, main] = sortData(data);

  const setCardsList = (title) => {
    return title === "Булки"
      ? bun
      : title === "Соусы"
      ? sauce
      : title === "Начинки"
      ? main
      : [];
  };

  return (
    <div className={styles.window}>
      <ul className={styles.block}>
        {menu.map((i) => (
          <li className={styles.block__item} key={i.id}>
            <h2 className={cnBlockTitle}>{i.title}</h2>
            <ul className={cnCards}>
              {setCardsList(i.title).map((item) => (
                <li className={styles.cards__card} key={item._id}>
                  <BurgerIngrCard cardData={item} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BurgerIngrWindow;
