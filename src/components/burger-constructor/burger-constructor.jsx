import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useEffect, useReducer, useState } from "react";
import { apiRequests } from "../../utils/api-requests";
import { setOrderRequestBody } from "../../utils/utils";
import { orderReducer } from "../../services/reducers/reducers";

import { useSelector } from "react-redux";

const BurgerConstructor = memo(() => {
  const { ingredients, bun, empty } = useSelector(store => store.burgConstructor);
  const { isModalOpen } = useSelector((store) => store.orderDetails);

  // const [totalPrice, dispatch] = useReducer(orderReducer, null);
  // const [order, setOrder] = useState({ ingredients: [], empty: true });

  // Захардкодил заполнение order для ревью.
  // В дальнейшем заполнять order после drag&drop
  // useEffect(() => {
  //   if (menu.bun)
  //     setOrder((order) => ({
  //       ...order,
  //       bun: menu.bun[0],
  //       ingredients: [...menu.sauce, ...menu.main],
  //       empty: false,
  //     }));
  // }, [menu]);

  // Временная логика для ревью ==> удалить позже
  // useEffect(() => {
  //   if (order.empty) return;
  //   if (order.bun) dispatch({ type: "bun", bun: order.bun });
  //   if (order.ingredients.length)
  //     dispatch({ type: "ingredients", ingredients: order.ingredients });
  // }, [order]);

  const handleBtnClick = () => {
    // apiRequests
    //   .postOrder(setOrderRequestBody(order))
    //   .then((res) => {
    //     if (res.success) {
    //       return openModal({ number: res.order.number });
    //     }
    //     throw new Error("Увы, заказ не принят:(");
    //   })
    //   .catch((err) => alert(err.message));
  };

  return (
    <section className={`${styles.constructor} pt-25 pr-2 pl-4 ml-10`}>
      {!empty && (
        <>
          <div className={styles.constructor__container}>
            {bun && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            )}
            <ul className={`${styles.constructor__scroll} mt-4 mb-4`}>
              {ingredients.map((i) => (
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
            {bun && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            )}
          </div>
          <div className={`${styles.constructor__confirm} mt-10`}>
            <div className={`${styles.constructor__price} mr-10`}>
              <span
                className={`${
                  styles[`constructor__price-value`]
                } text text_type_digits-default`}
              >
                777
                {/* {totalPrice} */}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="medium" onClick={handleBtnClick}>
              Оформить заказ
            </Button>
          </div>
          {isModalOpen && (
            <Modal type="order" mod="pb-30">
              <OrderDetails />
            </Modal>
          )}
        </>
      )}
    </section>
  );
});

export default BurgerConstructor;
