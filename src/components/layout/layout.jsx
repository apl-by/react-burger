import styles from "./layout.module.css";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router";

const Layout = () => {
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
};

export default Layout;
