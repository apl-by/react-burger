import styles from "./container.module.css";
import PropTypes from "prop-types";

const Container = ({ children, mod = "" }) => {
  return <div className={`${styles.container} ${mod}`}>{children}</div>;
};

export default Container;

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  mod: PropTypes.string,
};
