import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

const Modal = ({ children, title, onClick, mod = "pb-15" }) => {
  const cnModal = cn(styles.modal, "pt-10", "pr-10", "pl-10", mod);
  const cnModalTitle = cn(styles.modal__title, "text", "text_type_main-large");

  return createPortal(
    <ModalOverlay onClick={onClick}>
      <div className={cnModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal__container}>
          {title && <h3 className={cnModalTitle}>{title}</h3>}
          <CloseIcon type="primary" onClick={onClick} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("react-modals")
  );
};

export default Modal;
