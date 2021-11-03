import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { useEffect, useCallback } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({ children, title, dispatchAction, mod = "pb-15" }) => {
  const closeByEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        dispatchAction();
      }
    },
    [dispatchAction]
  );

  useEffect(() => {
    document.addEventListener("keyup", closeByEsc);
    return () => document.removeEventListener("keyup", closeByEsc);
  }, [closeByEsc]);

  const closeModal = () => {
    dispatchAction();
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
    document.getElementById("react-modals")
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  dispatchAction: PropTypes.func.isRequired,
  mod: PropTypes.string,
};
