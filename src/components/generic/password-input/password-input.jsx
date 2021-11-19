import { useMemo, useRef, useState } from "react";
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
  error,
  setError,
}) => {
  const [fieldDisabled, setDisabled] = useState(disabled);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

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
    setError((prev) => ({ ...prev, [name]: value.length < 6 }));
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
      errorText={value === "" ? "Введите пароль" : "Некорректный пароль"}
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
  error: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};
