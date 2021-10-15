import styles from "./modal-overlay.module.css";

const ModalOverlay = ({children, onClick}) => {
  return <div className={styles.overlay} onClick={onClick}>
    {children}
  </div>
};

export default ModalOverlay;
