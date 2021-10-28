import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { useEffect, useCallback, useMemo} from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  CLOSE_INGR_DETAILS,
  CLOSE_ORDER_DETAILS,
} from "../../services/actions";

const Modal = ({ children, title, type, mod = "pb-15" }) => {
  const dispatch = useDispatch();
  
  const action = useMemo(
    () =>
      type === "ingredient"
        ? { type: CLOSE_INGR_DETAILS }
        : type === "order"
        ? { type: CLOSE_ORDER_DETAILS }
        : undefined,
    [type]
  );

  const closeByEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
       action ? dispatch(action) : void 0;
      }
    },
    [action, dispatch]
  );

  useEffect(() => {
    document.addEventListener("keyup", closeByEsc);
    return () => document.removeEventListener("keyup", closeByEsc);
  }, [closeByEsc]);

  const closeModal = () => {
    action ? dispatch(action) : void 0;
  };

  return createPortal(
    <ModalOverlay onClick={(e) => e.target !== e.currentTarget || closeModal()}>
      <div
        className={`${styles.modal} pt-10 pr-10 pl-10 ${mod}`}
      >
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
  type: PropTypes.string.isRequired,
  mod: PropTypes.string,
};
