import { useMemo, useRef, useState, FC } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ICustomInput } from "../../../types/common";

const PasswordInput: FC<ICustomInput> = ({
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
  const [fieldDisabled, setDisabled] = useState<boolean>(disabled);
  const [visible, setVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const iconType = useMemo(() => {
    if (icon) {
      return icon;
    } else if (!visible) {
      return "HideIcon";
    } else {
      return "ShowIcon";
    }
  }, [icon, visible]);

  const onIconClick = (): void => {
    if (iconType === "EditIcon") {
      setDisabled(false);
    }
    if (iconType === "HideIcon") {
      setVisible(true);
    }
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value: string): void => {
    setError((prev) => ({ ...prev, [name]: value.length < 6 }));
  };

  const onFocus = (): void => {
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
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
