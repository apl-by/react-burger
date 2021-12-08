import styles from "./paragraph-link.module.css";
import { Link } from "react-router-dom";
import { FC } from "react";

interface IParagraphLink {
  link: string;
  to: string;
  mod?: string;
}

const ParagraphLink: FC<IParagraphLink> = ({
  children,
  link,
  to,
  mod = "",
}) => {
  return (
    <div
      className={`${styles.container} text text_type_main-default text_color_inactive ${mod}`}
    >
      <p className={styles[`paragraph-link`]}>{children}</p>
      <Link to={to} className={styles.link}>
        {link}
      </Link>
    </div>
  );
};

export default ParagraphLink;
