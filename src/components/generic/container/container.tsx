import styles from "./container.module.css";
import { FC } from "react";

interface IContainer {
  mod?: string;
}

const Container: FC<IContainer> = ({ children, mod = "" }) => {
  return <div className={`${styles.container} ${mod}`}>{children}</div>;
};

export default Container;
