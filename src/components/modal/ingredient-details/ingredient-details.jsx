import styles from "./ingredient-details.module.css";
import { modalCardTemplate } from "../../../utils/data";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useMemo } from "react";

const IngredientDetails = ({ id }) => {
  const menu = useSelector((store) => store.menu.menu);
  const ingredient = useMemo(() => menu.find((ingr) => ingr._id === id), [menu, id])

  if (menu.length === 0) {
    return null;
  }

  return (
    <div className={styles.details}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={styles.details__img}
      />
      <p
        className={`${styles.details__name} mt-4 mb-8 text text_type_main-medium`}
      >
        {ingredient.name}
      </p>
      <ul className={styles.details__list}>
        {modalCardTemplate.map((i) => (
          <li
            className={`${styles.details__item} mr-5 text text_type_main-default text_color_inactive`}
            key={i.id}
          >
            {i.sign}
            <br />
            <span
              className={`mt-2 text text_type_digits-default text_color_inactive`}
            >
              {ingredient[i.key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  id: PropTypes.string.isRequired,
};
