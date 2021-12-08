import { useState, FC } from "react";
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
import { ErrorSetter } from "../../types/common";

const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  // используется any (до типизации useSelector)
  const { isAuthorized, wasInitialAuth } = useSelector(
    (state: any) => state.userData
  );
  // используется any (до типизации useSelector)
  const isRequest = useSelector((state: any) => state.request.isRequest);

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
  });
  const [error, setError] = useState({ email: false });
  const setErr = setError as ErrorSetter;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (hasEmptyInput(inputValue)) {
      setErr((prev) => ({
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
    return <>{null}</>;
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
          setError={setErr}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Вспомнили пароль?
      </ParagraphLink>
    </Container>
  );
};

export default ForgotPasswordPage;
