import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import useModal from "../../hoocs/use-modal";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
// Временная заглушка
import image from "../../images/modal-done.png";

const BurgerConstructor = ({ order }) => {
  const { isOpen, info, openModal, closeModal } = useModal({});
  console.log(info);

  const cnConstructor = cn(
    styles.constructor,
    "pt-25",
    "pr-2",
    "pl-4",
    "ml-10"
  );
  const cnConstructorScroll = cn(styles.constructor__scroll, "mt-4", "mb-4");
  const cnConstructorConfirm = cn(styles.constructor__confirm, "mt-10");
  const cnConstructorPrice = cn(styles.constructor__price, "mr-10");
  const cnConstructorPriceValue = cn(
    styles[`constructor__price-value`],
    "text",
    "text_type_digits-default"
  );

  const handleBtnClick = () => {
    // Передать объект ответа с сервера
    openModal({});
  };

  return (
    <section className={cnConstructor}>
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
            <ul className={cnConstructorScroll}>
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
          <div className={cnConstructorConfirm}>
            <div className={cnConstructorPrice}>
              <span className={cnConstructorPriceValue}>620</span>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="medium" onClick={handleBtnClick}>
              Оформить заказ
            </Button>
          </div>
          {isOpen && (
            // Заменить тестовые данные при получении ответа с сервера
            <Modal onClick={closeModal} mod="pb-30">
              <p
                className={`${styles.modal__order} text text_type_digits-large`}
              >
                034536
              </p>
              <p
                className={`${styles.modal__text} mt-8 mb-15 text text_type_main-medium`}
              >
                идентификатор заказа
              </p>
              <img src={image} alt="Заказ подтвержден" />
              <p
                className={`${styles.modal__text} mt-15 mb-2 text text_type_main-default`}
              >
                Ваш заказ начали готовить
              </p>
              <p
                className={`${styles.modal__text} text text_type_main-default text_color_inactive`}
              >
                Дождитесь готовности на орбитальной станции
              </p>
            </Modal>
          )}
        </>
      )}
    </section>
  );
};

export default BurgerConstructor;
