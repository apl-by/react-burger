import styles from "./burg-ingr-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dndTypes } from "../../../../utils/data";
import { memo, useMemo, FC } from "react";
import { useSelector } from "../../../../hooks/reduxHooks";
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from "react-router";
import { IMenuItem } from "../../../../types/common";

interface IBurgIngrCard {
  cardData: IMenuItem;
}

const BurgIngrCard: FC<IBurgIngrCard> = memo(({ cardData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundPath = location.pathname;
  const bunId = useSelector((store) => store.burgConstructor.bun?._id);
  const ingrCount = useSelector(
    (store) => store.burgConstructor.ingrCounter?.[cardData._id]
  );

  const [, dragRef] = useDrag({
    type: dndTypes.burgIngredient,
    item: { ...cardData },
  });

  const count = useMemo<number | undefined>(() => {
    if (cardData.type === "bun") {
      return bunId === cardData._id ? 2 : undefined;
    } else {
      return ingrCount;
    }
  }, [bunId, ingrCount, cardData._id, cardData.type]);

  const handleClick = (): void => {
    navigate(`/ingredients/${cardData._id}`, {
      state: { background: { pathname: backgroundPath, key: cardData._id } },
    });
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
