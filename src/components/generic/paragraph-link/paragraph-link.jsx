import styles from "./paragraph-link.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ParagraphLink = ({ children, link, to, mod = "" }) => {
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

ParagraphLink.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  mod: PropTypes.string,
};
