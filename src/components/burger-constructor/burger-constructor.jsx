import styles from "./burger-constructor.module.css";
import Bun from "./bun/bun";
import Ingredient from "./ingredient/ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ADD_BUN,
  ADD_INGREDIENT,
} from "../../services/actions";
import { setTotalPrice } from "../../utils/utils";

const BurgerConstructor = memo(() => {
  const { ingredients, bun, empty } = useSelector(
    (store) => store.burgConstructor
  );
  const { isModalOpen } = useSelector((store) => store.orderDetails);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(cardData) {
      handleDrop(cardData);
    },
  });

  const handleDrop = (cardData) => {
    cardData.type === "bun"
      ? dispatch({ type: ADD_BUN, payload: cardData })
      : dispatch({ type: ADD_INGREDIENT, payload: cardData });
  };

  const totalPrice = useMemo(
    () => setTotalPrice(bun, ingredients),
    [bun, ingredients]
  );

  const handleBtnClick = (e) => {
    e.preventDefault();
    if (!bun) {
      alert("Выберите булку");
      return;
    }

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
    <section
      className={`${styles.constructor} pt-25 pr-2 pl-4 ml-10`}
      ref={dropTarget}
    >
      {!empty && (
        <>
          <div className={styles.constructor__container}>
            {bun && <Bun type="top" text="верх" />}
            <ul className={`${styles.constructor__scroll} mt-4 mb-4`}>
              {ingredients.map((i, ind) => (
                <Ingredient key={ind} data={i} ind={ind} />
              ))}
            </ul>
            {bun && <Bun type="bottom" text="низ" />}
          </div>
          <div className={`${styles.constructor__confirm} mt-10`}>
            <div className={`${styles.constructor__price} mr-10`}>
              <span
                className={`${
                  styles[`constructor__price-value`]
                } text text_type_digits-default`}
              >
                {totalPrice}
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
