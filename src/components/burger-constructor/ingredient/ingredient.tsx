import styles from "./ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, FC } from "react";
import { dndTypes } from "../../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../../services/actions/main";
import { useDrop, useDrag } from "react-dnd";
import { IMenuItem } from "../../../types/common";

interface IIngredient {
  ind: number;
  data: IMenuItem;
}

const Ingredient: FC<IIngredient> = ({ ind, data }) => {
  // используется any (до типизации useSelector)
  const ingredients = useSelector(
    (store: any) => store.burgConstructor.ingredients
  );
  const dispatch = useDispatch();

  const ingrRef = useRef<HTMLLIElement>(null);

  const removeIngredient = (ind: number): void => {
    dispatch({ type: REMOVE_INGREDIENT, payload: ind });
  };

  const [, drop] = useDrop({
    accept: dndTypes.ingrConstructor,
    hover(item: { index: number }) {
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
    type: dndTypes.ingrConstructor,
    item: {
      index: ind,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const moveIngr = (dragIndex: number, hoverIndex: number) => {
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
      <DragIcon type="primary"/>
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