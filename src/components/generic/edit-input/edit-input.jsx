import { useRef, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const EditInput = ({ value, onChange, name, size = "default" }) => {
  const [fieldDisabled, setDisabled] = useState(true);
  const inputRef = useRef(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onBlur = (e) => setDisabled(true);

  return (
    <Input
      type="email"
      placeholder={"Имя"}
      onChange={onChange}
      icon={"EditIcon"}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      name={name}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      size={size}
    />
  );
};

export default EditInput;

EditInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};
