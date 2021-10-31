import styles from "./ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { cardPropTypes } from "../../../utils/prop-types";
import { useDispatch } from "react-redux";
import {
  REMOVE_INGREDIENT,
} from "../../../services/actions";

const Ingredient = ({ ind, data }) => {
  const dispatch = useDispatch();

  const removeIngredient = (ind) => {
    dispatch({ type: REMOVE_INGREDIENT, payload: ind });
  };
 
  return (
    <li className={styles.ingredient}>
      <DragIcon />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image_mobile}
        handleClose={() => removeIngredient(ind)}
      />
    </li>
  );
}

export default Ingredient;


Ingredient.propTypes = {
  ind: PropTypes.number.isRequired,
  data: cardPropTypes,
};
