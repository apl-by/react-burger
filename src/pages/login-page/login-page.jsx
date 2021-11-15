import { useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";
import { findEmptyInput, findErrorInput } from "../../utils/utils";

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState({});
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (findEmptyInput(inputValue) || findErrorInput(isError)) return;
    console.log(777)
  };

  return (
    <Container>
      <Form btnName="Войти" title="Вход" onSubmit={handleSubmit}>
        <EmailInput
          onChange={onChange}
          value={inputValue.email}
          name={"email"}
          setIsError={setIsError}
        />
        <PasswordInput
          onChange={onChange}
          value={inputValue.password}
          name={"password"}
          setIsError={setIsError}
        />
      </Form>
      <ParagraphLink link="Зарегистрироваться" to="/register" mod="mb-4">
        Вы — новый пользователь?
      </ParagraphLink>
      <ParagraphLink link="Восстановить пароль" to="/forgot-password">
        Забыли пароль?
      </ParagraphLink>
    </Container>
  );
};

export default LoginPage;
