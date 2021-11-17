import { useRef, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const TextInput = ({
  value,
  onChange,
  name,
  icon,
  placeholder = "Имя",
  size = "default",
  disabled = false,
  error,
  setError,
}) => {
  const [fieldDisabled, setDisabled] = useState(disabled);
  const inputRef = useRef(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onFocus = () => {
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const onBlur = (e) => {
    if (disabled) {
      setDisabled(true);
    }
  };

  return (
    <Input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      icon={icon}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      error={error}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      errorText={
        value === "" ? "Заполните поле ввода" : "Ой, произошла ошибка!"
      }
      size={size}
    />
  );
};

export default TextInput;

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};
