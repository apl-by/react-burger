import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({ children, title, onClick, mod = "pb-15" }) => {

  return createPortal(
    <ModalOverlay onClick={onClick}>
      <div
        className={`${styles.modal} pt-10 pr-10 pl-10 ${mod}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal__container}>
          {title && (
            <h2 className={`${styles.modal__title} text text_type_main-large`}>
              {title}
            </h2>
          )}
          <CloseIcon type="primary" onClick={onClick} />
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
  onClick: PropTypes.func.isRequired,
  mod: PropTypes.string,
};
