import styles from "./burg-ingr-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { cardPropTypes } from "../../../../utils/prop-types";
import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { SHOW_INGR_DETAILS } from "../../../../services/actions";

const BurgIngrCard = memo(({ cardData }) => {
  const bunId = useSelector((store) => store.burgConstructor.bun?._id);
  const ingrCount = useSelector(
    (store) => store.burgConstructor.ingrCounter?.[`${cardData._id}`]
  );
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...cardData },
  });

  const count = useMemo(() => {
    if (cardData.type === "bun") {
      return bunId === cardData._id ? 1 : undefined;
    } else {
      return ingrCount;
    }
  }, [bunId, ingrCount, cardData._id, cardData.type]);

  const handleClick = () => {
    dispatch({ type: SHOW_INGR_DETAILS, payload: { ...cardData } });
  };

  return (
    <div className={styles.card} onClick={handleClick} ref={dragRef}>
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
};
