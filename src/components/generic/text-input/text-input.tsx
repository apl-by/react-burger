import { useRef, useState, FC } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ICustomInput } from "../../../types/common";

const TextInput: FC<ICustomInput> = ({
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
  const [fieldDisabled, setDisabled] = useState<boolean>(disabled);
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = (): void => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onFocus = (): void => {
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const onBlur = (): void => {
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
