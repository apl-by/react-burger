import styles from "./ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useRef } from "react";
import { cardPropTypes } from "../../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from "../../../services/actions";
import { useDrop, useDrag } from "react-dnd";

const Ingredient = ({ ind, data }) => {
  const ingredients = useSelector((store) => store.burgConstructor.ingredients);
  const dispatch = useDispatch();

  const ingrRef = useRef(null);

  const removeIngredient = (ind) => {
    dispatch({ type: REMOVE_INGREDIENT, payload: ind });
  };

  const [, drop] = useDrop({
    accept: "ingrConstructor",
    hover(item) {
      if (!ingrRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = ind;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveIngr(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ingrConstructor",
    item: {
      index: ind,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const moveIngr = (dragIndex, hoverIndex) => {
    const dragIngr = ingredients[dragIndex];
    const stateCopy = [...ingredients];
    const deletedHover = stateCopy.splice(hoverIndex, 1, dragIngr);
    stateCopy.splice(dragIndex, 1, deletedHover[0]);
    dispatch({ type: MOVE_INGREDIENT, payload: stateCopy });
  };

  const opacity = isDragging ? "ingredient_hidden" : "";

  drag(drop(ingrRef));

  return (
    <li className={`${styles.ingredient} ${styles[opacity]}`} ref={ingrRef}>
      <DragIcon />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image_mobile}
        handleClose={() => removeIngredient(ind)}
      />
    </li>
  );
};

export default Ingredient;

Ingredient.propTypes = {
  ind: PropTypes.number.isRequired,
  data: cardPropTypes,
};
