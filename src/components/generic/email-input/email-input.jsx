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
  error,
  setError,
}) => {
  const [fieldDisabled, setDisabled] = useState(disabled);
  const inputRef = useRef(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value) => {
    setError((prev) => ({ ...prev, [name]: !validateEmail(value) }));
  };

  const onFocus = () => {
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const onBlur = (e) => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError((prev) => ({ ...prev, [name]: false }));
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
      errorText={value === "" ? "Укажите Ваш email" : "Ой, произошла ошибка!"}
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
  error: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};
