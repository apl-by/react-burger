import styles from "./profile-page.module.css";
import { useState } from "react";
import ProfileNav from "../../components/generic/profile-nav/profile-nav";
import EditInput from "../../components/generic/edit-input/edit-input";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";

const ProfilePage = () => {
  const [inputValue, setInputValue] = useState({
    text: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div className={styles.container}>
      <ProfileNav />
      <ul className={`${styles.list}`}>
        <li className={`${styles.list__input} mb-6`}>
          <EditInput
            onChange={onChange}
            value={inputValue.text}
            name={"text"}
          />
        </li>
        <li className={`${styles.list__input} mb-6`}>
          <EmailInput
            onChange={onChange}
            value={inputValue.email}
            name={"email"}
            placeholder={"Логин"}
            icon={"EditIcon"}
            disabled={true}
          />
        </li>
        <li className={`${styles.list__input} mb-6`}>
          <PasswordInput
            onChange={onChange}
            value={inputValue.password}
            name={"password"}
            icon={"EditIcon"}
            disabled={true}
          />
        </li>
      </ul>
    </div>
  );
};

export default ProfilePage;
