import { FC, useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";
import TextInput from "../../components/generic/text-input/text-input";
import {
  hasEmptyInput,
  hasErrorInput,
  setErrInEmptyInput,
} from "../../utils/utils";
import { register } from "../../services/thunks/requests";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";
import Modal from "../../components/modal/modal";
import Confirm from "../../components/modal/confirm/confirm";
import useConfirm from "../../hooks/useConfirm";
import { ErrorSetter } from "../../types/common";

type TInputValue<T> = {
  name: T;
  email: T;
  password: T;
};

const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // используется any (до типизации useSelector)
  const { isAuthorized, wasInitialAuth } = useSelector(
    (state: any) => state.userData
  );
  // используется any (до типизации useSelector)
  const isRequest = useSelector((state: any) => state.request.isRequest);
  // используется any (до типизации useSelector)
  const { show, text } = useSelector((state: any) => state.confirmation);

  const { confirm, onConfirm, onCancel } = useConfirm();

  const [inputValue, setInputValue] = useState<TInputValue<string>>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<TInputValue<boolean>>({
    name: false,
    email: false,
    password: false,
  });
  const setErr = setError as ErrorSetter;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (hasEmptyInput(inputValue)) {
      setErr((prev) => ({
        ...prev,
        ...setErrInEmptyInput(inputValue),
      }));
      return;
    }
    if (isRequest || hasErrorInput(error)) return;

    dispatch(register(inputValue, confirm));
  };

  if (isAuthorized) {
    return <Navigate to={location.state ? location.state?.from : "/"} />;
  } else if (!wasInitialAuth) {
    return <>{null}</>;
  }

  return (
    <>
      <Container>
        <Form
          btnName="Зарегистрироваться"
          title="Регистрация"
          onSubmit={handleSubmit}
        >
          <TextInput
            onChange={onChange}
            value={inputValue.name}
            name={"name"}
            error={error.name}
            setError={setErr}
          />
          <EmailInput
            onChange={onChange}
            value={inputValue.email}
            name={"email"}
            error={error.email}
            setError={setErr}
          />
          <PasswordInput
            onChange={onChange}
            value={inputValue.password}
            name={"password"}
            error={error.password}
            setError={setErr}
          />
        </Form>
        <ParagraphLink link="Войти" to="/login">
          Уже зарегистрированы?
        </ParagraphLink>
      </Container>
      {show && (
        <Modal onClose={onCancel}>
          <Confirm
            text={text}
            btnTrue={"Войти"}
            btnFalse={"Спасибо, не сейчас"}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </Modal>
      )}
    </>
  );
};

export default RegisterPage;
