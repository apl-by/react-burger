import styles from "./profile-orders-page.module.css";
import Feed from "../../components/feed/feed";
import ProfileNav from "../../components/generic/profile-nav/profile-nav";
import { FC } from "react";

const ProfileOrdersPage: FC = () => {
  return (
    <div className={styles.container}>
      <ProfileNav mix={"mr-15 mt-20"} />
      <Feed mod={"profile"} />
    </div>
  );
};

export default ProfileOrdersPage;
