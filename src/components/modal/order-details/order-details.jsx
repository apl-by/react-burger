import styles from "./order-details.module.css";
// import PropTypes from "prop-types";

// Временная заглушка
import image from "../../../images/modal-done.png";

const OrderDetails = ({ info }) => {
  // Заменить тестовые данные на данные из info
  return (
    <div className={styles.details}>
      <p className={`${styles.details__order} text text_type_digits-large`}>
        034536
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

// OrderDetails.propTypes = {
//   info: формат данных ещё не известен,
// };
