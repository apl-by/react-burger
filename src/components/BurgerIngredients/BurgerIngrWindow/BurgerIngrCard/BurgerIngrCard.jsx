import { useState } from "react";
import styles from "./BurgerIngrCard.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

const BurgerIngrCard = ({ cardData }) => {
  // Временно для ревью. После реализации логики,
  //  исправить на useState(null)
  const [count, setCount] = useState(1);

  const cnCardImg = cn(styles.card__img, "ml-4", "mr-4");
  const cnCardBox = cn(styles.card__box, "mt-1", "mb-1");
  const cnCardPrice = cn(
    styles.card__price,
    "mr-2",
    "text",
    "text_type_digits-default"
  );
  const cnCardName = cn(
    styles.card__name,
    "mr-2",
    "text",
    "text_type_main-default"
  );

  return (
    <div className={styles.card}>
      {count && <Counter count={count} size="default" />}
      <img src={cardData.image} alt={cardData.name} className={cnCardImg} />
      <div className={cnCardBox}>
        <p className={cnCardPrice}>{cardData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={cnCardName}>{cardData.name}</p>
    </div>
  );
};

export default BurgerIngrCard;
