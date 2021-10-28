import styles from "./order-details.module.css";
import image from "../../../images/modal-done.png";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const number = useSelector((store) => store.orderDetails.orderRes.order.number);

  return (
    <div className={styles.details}>
      <p className={`${styles.details__order} text text_type_digits-large`}>
        {number}
      </p>
      <p
        className={`${styles.details__text} mt-8 mb-15 text text_type_main-medium`}
      >
        идентификатор заказа
      </p>
      <img src={image} alt="Заказ подтвержден" />
      <p
        className={`${styles.details__text} mt-15 mb-2 text text_type_main-default`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.details__text} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
