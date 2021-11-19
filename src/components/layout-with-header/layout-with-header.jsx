import styles from "./layout-with-header.module.css";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router";
import { memo } from "react";

const LayoutWithHeader = memo(() => {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </DndProvider>
    </div>
  );
});

export default LayoutWithHeader;
