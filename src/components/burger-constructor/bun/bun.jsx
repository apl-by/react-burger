import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Bun = ({ type, text }) => {
  const bun = useSelector((store) => store.burgConstructor.bun);
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

Bun.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
