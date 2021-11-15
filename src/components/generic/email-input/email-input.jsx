import { useRef, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const EmailInput = ({
  value,
  onChange,
  name,
  icon,
  placeholder = "E-mail",
  size = "default",
  disabled = false,
}) => {
  const [fieldDisabled, setDisabled] = useState(disabled);

  const [error, setError] = useState(false);

  const inputRef = useRef(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value) => {
    setError(!validateEmail(value));
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = (e) => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    if (disabled) {
      setDisabled(true);
    }
  };
  return (
    <Input
      type="email"
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
      errorText={"Ой, произошла ошибка!"}
      size={size}
    />
  );
};

export default EmailInput;

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};
