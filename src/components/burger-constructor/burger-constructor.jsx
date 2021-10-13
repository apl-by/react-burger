import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { data } from "../../utils/data";
import { sortData } from "../../utils/utils";

// Для хардкода массив данных:
const [bun, sauce, main] = sortData(data);

const BurgerConstructor = () => {
  const cnConstructor = cn(styles.constructor, "pt-25", "pr-2", "pl-4", "ml-10");
  const cnConstructorScroll = cn(styles.constructor__scroll, "mt-4", "mb-4");
  const cnConstructorConfirm = cn(styles.constructor__confirm, "mt-10");
  const cnConstructorPrice = cn(styles.constructor__price, "mr-10");
  const cnConstructorPriceValue = cn(
    styles[`constructor__price-value`],
    "text",
    "text_type_digits-default"
  );

  return (
    <section className={cnConstructor}>
      <div className={styles.constructor__container}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun[0].name} (верх)`}
          price={200}
          thumbnail={bun[0].image_mobile}
        />
        <ul className={cnConstructorScroll}>
          {main.map((i) => (
            <li className={styles.constructor__item} key={i._id}>
              <DragIcon />
              <ConstructorElement
                text={i.name}
                price={i.price}
                thumbnail={i.image_mobile}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun[0].name} (низ)`}
          price={200}
          thumbnail={bun[0].image_mobile}
        />
      </div>
      <div className={cnConstructorConfirm}>
        <div className={cnConstructorPrice}>
          <span className={cnConstructorPriceValue}>620</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
