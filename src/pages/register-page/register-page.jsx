import { useState } from "react";
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

const RegisterPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthorized, wasInitialAuth } = useSelector(
    (state) => state.userData
  );
  const isRequest = useSelector((state) => state.request.isRequest);
  const { show, text } = useSelector((state) => state.confirmation);

  const { confirm, onConfirm, onCancel } = useConfirm();

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });

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

    dispatch(register(inputValue, confirm));
  };

  if (isAuthorized) {
    return <Navigate to={location.state ? location.state?.from : "/"} />;
  } else if (!wasInitialAuth) {
    return null;
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
            setError={setError}
          />
          <EmailInput
            onChange={onChange}
            value={inputValue.email}
            name={"email"}
            error={error.email}
            setError={setError}
          />
          <PasswordInput
            onChange={onChange}
            value={inputValue.password}
            name={"password"}
            error={error.password}
            setError={setError}
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
