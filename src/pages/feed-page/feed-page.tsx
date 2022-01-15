import styles from "./feed-page.module.css";
import Feed from "../../components/feed/feed";
import Stats from "../../components/stats/stats";
import { FC, memo } from "react";

const FeedPage: FC = memo(() => {
  return (
    <section className={styles.section}>
      <h1
        className={`${styles.title} mt-10 mb-5 ml-5 mr-5 text text_type_main-large`}
      >
        Лента заказов
      </h1>
      <div className={styles.container}>
        <Feed />
        <Stats />
      </div>
    </section>
  );
});

export default FeedPage;
