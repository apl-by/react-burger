import { useRef, useState, FC} from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ICustomInput } from "../../../types/common";

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const EmailInput: FC<ICustomInput> = ({
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
  const [fieldDisabled, setDisabled] = useState<boolean>(disabled);
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = (): void => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value: string): void => {
    setError((prev) => ({ ...prev, [name]: !validateEmail(value) }));
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
