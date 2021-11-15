import { useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";

const ForgotPasswordPage = () => {
  const [inputValue, setInputValue] = useState({});
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <Container>
      <Form btnName="Восстановить" title="Восстановление пароля">
        <EmailInput
          onChange={onChange}
          value={inputValue.email || ""}
          name={"email"}
          placeholder={"Укажите e-mail"}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Вспомнили пароль?
      </ParagraphLink>
    </Container>
  );
};

export default ForgotPasswordPage;
