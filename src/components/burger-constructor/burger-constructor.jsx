import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import useModal from "../../hoocs/use-modal";
import OrderDetails from "../modal/order-details/order-details";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ order }) => {
  const { isOpen, info, openModal, closeModal } = useModal({});

  const handleBtnClick = () => {
    // Передать объект ответа с сервера
    openModal({});
  };

  return (
    <section className={`${styles.constructor} pt-25 pr-2 pl-4 ml-10`}>
      {!order.empty && (
        <>
          <div className={styles.constructor__container}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${order.bun.name} (верх)`}
              price={200}
              thumbnail={order.bun.image_mobile}
            />
            <ul className={`${styles.constructor__scroll} mt-4 mb-4`}>
              {order.ingridients.map((i) => (
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
              type="bottom"
              isLocked={true}
              text={`${order.bun.name} (низ)`}
              price={200}
              thumbnail={order.bun.image_mobile}
            />
          </div>
          <div className={`${styles.constructor__confirm} mt-10`}>
            <div className={`${styles.constructor__price} mr-10`}>
              <span
                className={`${
                  styles[`constructor__price-value`]
                } text text_type_digits-default`}
              >
                620
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="medium" onClick={handleBtnClick}>
              Оформить заказ
            </Button>
          </div>
          {isOpen && (
            <Modal onClick={closeModal} mod="pb-30">
              <OrderDetails info={info} />
            </Modal>
          )}
        </>
      )}
    </section>
  );
};

export default BurgerConstructor;
