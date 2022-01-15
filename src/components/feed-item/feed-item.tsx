import styles from "./feed-item.module.css";
import { FC, useState, memo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router";
import { IOrder, IMenuItem } from "../../types/common";
import { handleOrder } from "../../utils/utils";

interface IFeedItem {
  mod?: string;
  orderData: IOrder;
}

const FeedItem: FC<IFeedItem> = memo(({ mod, orderData }) => {
  const menu = useSelector((state) => state.menu.menu);
  const order = handleOrder(orderData, menu);
  const navigate = useNavigate();
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const lengthIngr = mod === "profile" ? 12 : 7;

  const ingredientsArr = order.ingrForRender as IMenuItem[];
  const ingredientsForRender =
    ingredientsArr.length > lengthIngr
      ? ingredientsArr.slice(0, lengthIngr)
      : ingredientsArr;

  const pathTo =
    mod === "profile"
      ? `/profile/orders/${order.number}`
      : `/feed/${order.number}`;

  const backgroundPath = mod === "profile" ? `/profile/orders` : "/feed";

  const handleClick = (): void => {
    navigate(pathTo, {
      state: {
        background: {
          pathname: backgroundPath,
        },
        key: order.number,
        order: order,
      },
    });
  };

  return (
    <li className={styles.item} onClick={handleClick}>
      <div className={`${styles[`item__data-container`]} mb-6`}>
        <span
          className={`${styles.item__number} text text_type_digits-default`}
        >
          {`#${order.number}`}
        </span>
        <span
          className={`${styles.item__data} text text_type_main-default text_color_inactive`}
        >
          {order.time}
        </span>
      </div>
      <p className={`${styles.item__name} text text_type_main-medium`}>
        {orderData.name}
      </p>
      {mod === "profile" && (
        <p
          className={`${styles.item__name} text text_type_main-default mt-2 ${
            order.status === "Выполнен" && styles.item__name_color_green
          }`}
        >
          {order.status}
        </p>
      )}
      <div className={`${styles.item__result} mt-6`}>
        <ul className={styles.item__ingredients}>
          {ingredientsForRender.map((i, ind) => (
            <li
              className={styles.item__ingredient}
              key={ind}
              style={{
                transform: `translate(${-15 * ind}px, ${0}px)`,
                zIndex: lengthIngr - ind,
              }}
            >
              <img
                src={i.image_mobile}
                alt={i.name}
                hidden={!isImgLoaded}
                onLoad={() => (isImgLoaded ? void 0 : setIsImgLoaded(true))}
                className={styles.item__img}
              />
              {(i.count as number) > 1 && (
                <span
                  className={`${styles.item__count} text text_type_main-default`}
                >
                  {`+${i.count}`}
                </span>
              )}
            </li>
          ))}
          {ingredientsArr.length > lengthIngr && (
            <span
              className={styles.item__ellipsis}
              style={{ transform: `translate(${-15 * lengthIngr}px, ${0}px)` }}
            >
              ...
            </span>
          )}
        </ul>
        <div className={styles.item__price}>
          <span
            className={`${styles.item__value} ml-6 mr-2 text text_type_digits-default`}
          >
            {order.totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
});

export default FeedItem;
