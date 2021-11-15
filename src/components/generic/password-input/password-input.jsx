import { useMemo, useRef, useState, useEffect } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const PasswordInput = ({
  value,
  onChange,
  name,
  icon,
  placeholder = "Пароль",
  disabled = false,
  size = "default",
  setIsError,
}) => {
  const [fieldDisabled, setDisabled] = useState(disabled);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(
    () => setIsError((prev) => ({ ...prev, [name]: error })),
    [error, name, setIsError]
  );


  const iconType = useMemo(() => {
    if (icon) {
      return icon;
    } else if (!visible) {
      return "HideIcon";
    } else {
      return "ShowIcon";
    }
  }, [icon, visible]);

  const onIconClick = () => {
    if (iconType === "EditIcon") {
      setDisabled(false);
    }
    if (iconType === "HideIcon") {
      setVisible(true);
    }
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value) => {
    setError(value.length < 6);
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
    if (iconType === "EditIcon") {
      setDisabled(true);
    }
    if (iconType === "ShowIcon") {
      setVisible(false);
    }
  };

  return (
    <Input
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      onChange={onChange}
      icon={iconType}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      error={error}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      errorText={"Некорректный пароль"}
      size={size}
    />
  );
};

export default PasswordInput;

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  setIsError: PropTypes.func,
};
