import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useSelector } from "../../../hooks/reduxHooks";

interface IBun {
  type: "top" | "bottom" | undefined;
  text: string;
}

const Bun: FC<IBun> = ({ type, text }) => {
  const bun = useSelector((store) => store.burgConstructor.bun);

  if (bun === null) return <>{null}</>;
  
  return (
    <ConstructorElement
      type={type}
      isLocked={true}
      text={`${bun.name} (${text})`}
      price={bun.price}
      thumbnail={bun.image_mobile}
    />
  );
};

export default Bun;
