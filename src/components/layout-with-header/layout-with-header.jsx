import styles from "./layout-with-header.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import ErrorAlert from "../modal/error-alert/error-alert";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router";
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ERROR } from "../../services/actions/interaction";

const LayoutWithHeader = memo(() => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorAlert.errors);

  const handleAlertClose = () => dispatch({ type: CLEAR_ERROR });

  return (
    <>
      <div className={styles.layout}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <Outlet />
          </main>
        </DndProvider>
      </div>
      {errors.length > 0 && (
        <Modal onClose={handleAlertClose}>
          <ErrorAlert error={errors[0]} />
        </Modal>
      )}
    </>
  );
});

export default LayoutWithHeader;
