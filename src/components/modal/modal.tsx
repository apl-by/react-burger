import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { useEffect, useCallback, FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
  title?: string;
  mod?: string;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ children, title, onClose, mod = "pb-15" }) => {
  const closeByEsc = useCallback<(e: KeyboardEvent) => void>(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keyup", closeByEsc);
    return () => document.removeEventListener("keyup", closeByEsc);
  }, [closeByEsc]);

  const closeModal = () => {
    onClose();
  };

  return createPortal(
    <ModalOverlay onClick={(e) => e.target !== e.currentTarget || closeModal()}>
      <div className={`${styles.modal} pt-10 pr-10 pl-10 ${mod}`}>
        <div className={styles.modal__container}>
          {title && (
            <h2 className={`${styles.modal__title} text text_type_main-large`}>
              {title}
            </h2>
          )}
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("react-modals") as HTMLElement
  );
};

export default Modal;
