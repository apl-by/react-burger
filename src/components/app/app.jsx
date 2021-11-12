import { useEffect } from "react";
import Layout from "../layout/layout";
import MainPage from "../../pages/main-page";
import { useDispatch } from "react-redux";
import { getMenu } from "../../services/thunks";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
