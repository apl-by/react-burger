import styles from "./burger-constructor.module.css";
import Bun from "./bun/bun";
import Ingredient from "./ingredient/ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postOrder } from "../../services/thunks/main";
import { useDrop } from "react-dnd";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  CLOSE_ORDER_DETAILS,
} from "../../services/actions/main";
import { setTotalPrice, generateId } from "../../utils/utils";
import { dndTypes } from "../../utils/data";
import { useNavigate, useLocation } from "react-router";

const BurgerConstructor = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isAuthorized } = useSelector((state) => state.userData);
  const { ingredients, bun, empty } = useSelector(
    (store) => store.burgConstructor
  );
  const { isModalOpen, canSubmit } = useSelector((store) => store.orderDetails);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: dndTypes.burgIngredient,
    drop(cardData) {
      handleDrop(cardData);
    },
  });

  const handleDrop = (cardData) => {
    cardData.type === "bun"
      ? dispatch({ type: ADD_BUN, payload: cardData })
      : dispatch({
          type: ADD_INGREDIENT,
          payload: { ...cardData, uniqueId: generateId() },
        });
  };

  const totalPrice = useMemo(
    () => setTotalPrice(bun, ingredients),
    [bun, ingredients]
  );

  const submitOrder = (e) => {
    e.preventDefault();
    if (!isAuthorized) {
      return navigate("/login", { state: { from: location.pathname } });
    }
    if (!canSubmit) return;
    if (!bun) {
      alert("Выберите булку");
      return;
    }

    dispatch(postOrder([bun, ...ingredients]));
  };

  const closeModal = useCallback(() => {
    dispatch({ type: CLOSE_ORDER_DETAILS });
  }, [dispatch]);

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
                <Ingredient key={i.uniqueId} data={i} ind={ind} />
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
            <Button type="primary" size="medium" onClick={submitOrder}>
              Оформить заказ
            </Button>
          </div>
        </>
      )}
      {isModalOpen && (
        <Modal dispatchAction={closeModal} mod="pb-30">
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
});

export default BurgerConstructor;
