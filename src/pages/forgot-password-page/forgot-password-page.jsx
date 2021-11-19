import { useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import {
  hasEmptyInput,
  hasErrorInput,
  setErrInEmptyInput,
} from "../../utils/utils";
import { useNavigate, Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { confirmEmail } from "../../services/thunks/requests";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { isAuthorized, wasInitialAuth } = useSelector(
    (state) => state.userData
  );
  const isRequest = useSelector((state) => state.request.isRequest);

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "" });
  const [error, setError] = useState({ email: false });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasEmptyInput(inputValue)) {
      setError((prev) => ({
        ...prev,
        ...setErrInEmptyInput(inputValue),
      }));
      return;
    }
    if (isRequest || hasErrorInput(error)) return;

    dispatch(confirmEmail(inputValue, navigate));
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  } else if (!wasInitialAuth) {
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
