import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { FC } from "react";

const MainPage: FC = () => {
  return (
    <>
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  );
};

export default MainPage;
