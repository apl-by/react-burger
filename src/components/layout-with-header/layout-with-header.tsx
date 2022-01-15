import styles from "./layout-with-header.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import Alert from "../modal/alert/alert";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router";
import { memo, FC } from "react";
import { useSelector, useDispatch } from "../../hooks/reduxHooks";
import { CLEAR_ERROR, HIDE_ALERT } from "../../services/actions/interaction";

const LayoutWithHeader: FC = memo(() => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorAlert.errors);
  const alertMessage = useSelector((state) => state.alert.message);

  const handleErrAlertClose = (): void => {
    dispatch({ type: CLEAR_ERROR });
  };
  const handleAlertClose = (): void => {
    dispatch({ type: HIDE_ALERT });
  };

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
        <Modal onClose={handleErrAlertClose}>
          <Alert
            title={`Ошибка ${errors[0].status}`}
            message={errors[0].message}
          />
        </Modal>
      )}
      {alertMessage && (
        <Modal onClose={handleAlertClose}>
          <Alert message={alertMessage} />
        </Modal>
      )}
    </>
  );
});

export default LayoutWithHeader;
