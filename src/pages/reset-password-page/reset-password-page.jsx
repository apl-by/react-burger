import { useState, useRef } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../../components/generic/password-input/password-input";

const ResetPasswordPage = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState({});
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <Container>
      <Form btnName="Сохранить" title="Восстановление пароля">
        <PasswordInput
          onChange={onChange}
          value={inputValue.password || ""}
          name={"password"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={inputValue.text || ""}
          name={"text"}
          ref={inputRef}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Вспомнили пароль?
      </ParagraphLink>
    </Container>
  );
};

export default ResetPasswordPage;
