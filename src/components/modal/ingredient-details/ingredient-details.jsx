import styles from "./ingredient-details.module.css";
import { modalCardTemplate } from "../../../utils/data";

const IngredientDetails = ({ info }) => {
  return (
    <div className={styles.details}>
      <img
        src={info.image_large}
        alt={info.name}
        className={styles.details__img}
      />
      <p
        className={`${styles.details__name} mt-4 mb-8 text text_type_main-medium`}
      >
        {info.name}
      </p>
      <ul className={styles.details__list}>
        {modalCardTemplate.map((i, ind) => (
          <li
            className={`${styles.details__item} mr-5 text text_type_main-default text_color_inactive`}
            key={ind}
          >
            {i[0]}
            <br />
            <span
              className={`mt-2 text text_type_digits-default text_color_inactive`}
            >
              {info[`${i[1]}`]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientDetails;
