import styles from "./profile-page.module.css"
import { useState } from "react";
import Form from "../../components/generic/form/form";
import ProfileNav from "../../components/generic/profile-nav/profile-nav";
import EditInput from "../../components/generic/edit-input/edit-input";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";

const ProfilePage = () => {
  const [inputValue, setInputValue] = useState({});
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div className={styles.container}>
      <ProfileNav />
      <Form mod={styles.form__list_mod}>
        <EditInput
          onChange={onChange}
          value={inputValue.text || ""}
          name={"text"}
        />
        <EmailInput
          onChange={onChange}
          value={inputValue.email || ""}
          name={"email"}
          placeholder={"Логин"}
          icon={"EditIcon"}
          disabled={true}
        />
        <PasswordInput
          onChange={onChange}
          value={inputValue.password || ""}
          name={"password"}
          icon={"EditIcon"}
          disabled={true}
        />
      </Form>
    </div>
  );
};

export default ProfilePage;
