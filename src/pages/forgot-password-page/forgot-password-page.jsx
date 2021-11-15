import { useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import { apiRequests } from "../../utils/api-requests";
import { findEmptyInput, findErrorInput } from "../../utils/utils";
import { useNavigate } from "react-router";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "" });
  const [isError, setIsError] = useState({});
 
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value,});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (findEmptyInput(inputValue) || findErrorInput(isError)) return;

    apiRequests
      .confirmEmail(inputValue)
      .then((res) => {
        if (res.success) {
          navigate("/reset-password");
        } else {
          alert("Пользователя с такой почтой не существует");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Form
        btnName="Восстановить"
        title="Восстановление пароля"
        onSubmit={handleSubmit}
      >
        <EmailInput
          onChange={onChange}
          value={inputValue.email}
          name={"email"}
          placeholder={"Укажите e-mail"}
          setIsError={setIsError}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Вспомнили пароль?
      </ParagraphLink>
    </Container>
  );
};

export default ForgotPasswordPage;
