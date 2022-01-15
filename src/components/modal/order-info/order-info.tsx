import styles from "./order-info.module.css";
import { FC, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IHandeledOrder } from "../../../types/common";

interface IOrderInfo {
  order: IHandeledOrder;
}

const OrderInfo: FC<IOrderInfo> = ({ order }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className={`${styles.order} pt-10`}>
      <p className={`text text_type_main-medium mb-3`}>{order.name}</p>
      <p
        className={`${
          order.status === "Выполнен" && styles.order__status_color_greentext
        } text_type_main-default mb-15`}
      >
        {order.status}
      </p>
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ul className={`${styles.order__list}`}>
        {order.ingrForRender.map((i, ind) => (
          <li className={`${styles.order__item} mb-4`} key={ind}>
            <img
              src={i.image_mobile}
              alt={i.name}
              hidden={!isImgLoaded}
              onLoad={() => (isImgLoaded ? void 0 : setIsImgLoaded(true))}
              className={`${styles.order__img} mr-4`}
            />
            <p
              className={`${
                styles[`order__item-name`]
              } text text_type_main-default`}
            >
              {i.name}
            </p>
            <div className={styles.order__price}>
              <span
                className={`${
                  styles[`order__item-value`]
                } mr-2 ml-4 text text_type_digits-default`}
              >
                {`${i.count} x ${i.price}`}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.order__price} mt-10`}>
        <p className={`text text_type_main-default text_color_inactive `}>
          {order.time}
        </p>
        <span
          className={`${styles.order__value} mr-2 text text_type_digits-default`}
        >
          {order.totalPrice}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default OrderInfo;
