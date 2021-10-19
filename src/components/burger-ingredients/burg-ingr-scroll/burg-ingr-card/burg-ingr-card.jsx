import { useState } from "react";
import styles from "./burg-ingr-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { cardPropTypes } from "../../../../utils/prop-types";
import { memo } from "react";


const BurgIngrCard = memo(({ cardData, onClick }) => {
  // Временно для ревью. После реализации логики,
  //  исправить на useState(null)
  const [count, setCount] = useState(1);

  const handleClick = () => {
    onClick(cardData);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      {count && <Counter count={count} size="default" />}
      <img
        src={cardData.image}
        alt={cardData.name}
        className={`${styles.card__img} ml-4 mr-4`}
      />
      <div className={`${styles.card__box} mt-1 mb-1`}>
        <p
          className={`${styles.card__price} mr-2 text text_type_digits-default`}
        >
          {cardData.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.card__name} mr-2 text text_type_main-default`}>
        {cardData.name}
      </p>
    </div>
  );
});

export default BurgIngrCard;

BurgIngrCard.propTypes = {
  cardData: cardPropTypes,
  onClick: PropTypes.func.isRequired,
};
