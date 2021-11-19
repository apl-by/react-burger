import { useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import { apiRequests } from "../../utils/api-requests";
import {
  hasEmptyInput,
  hasErrorInput,
  setErrInEmptyInput,
} from "../../utils/utils";
import { useNavigate, Navigate } from "react-router";
import { useSelector } from "react-redux";

const ForgotPasswordPage = () => {
  const { isAuthorized, wasInitialRequest } = useSelector(
    (state) => state.userData
  );
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "" });
  const [error, setError] = useState({ email: false });
  const [wasSubmit, setWasSubmit] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWasSubmit(true);
    if (hasEmptyInput(inputValue)) {
      setWasSubmit(false);
      setError((prev) => ({
        ...prev,
        ...setErrInEmptyInput(inputValue),
      }));
      return;
    }
    if (wasSubmit || hasErrorInput(error)) {
      return setWasSubmit(false);
    }

    apiRequests
      .confirmEmail(inputValue)
      .then((res) => {
        if (res.success) {
          navigate("/reset-password", { state: { from: "/reset-password" } });
        } else {
          throw new Error("Произошла Ошибка");
        }
      })
      .catch((err) => {
        setWasSubmit(false);
        alert(`Error ${err.status ?? ""}: ${err.message}`);
      });
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  } else if (!wasInitialRequest) {
    return null;
  }

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
          error={error.email}
          setError={setError}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Вспомнили пароль?
      </ParagraphLink>
    </Container>
  );
};

export default ForgotPasswordPage;
