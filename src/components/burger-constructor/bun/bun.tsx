import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useSelector } from "react-redux";

interface IBun {
  type: "top" | "bottom" | undefined;
  text: string;
}

const Bun: FC<IBun> = ({ type, text }) => {
  // используется any (до типизации useSelector)
  const bun = useSelector((store: any) => store.burgConstructor.bun);
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
