import { useState, useRef } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const RegisterPage = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState({});
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <Container>
      <Form btnName="Зарегистрироваться" title="Регистрация">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={inputValue.text || ""}
          name={"text"}
          ref={inputRef}
        />
        <EmailInput
          onChange={onChange}
          value={inputValue.email || ""}
          name={"email"}
        />
        <PasswordInput
          onChange={onChange}
          value={inputValue.password || ""}
          name={"password"}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Уже зарегистрированы?
      </ParagraphLink>
    </Container>
  );
};

export default RegisterPage;
