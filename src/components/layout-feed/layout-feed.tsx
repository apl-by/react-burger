import { Outlet } from "react-router";
import { memo, FC, useEffect } from "react";
import { useDispatch } from "../../hooks/reduxHooks";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions";

const LayoutFeed: FC = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `/orders/all`,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
});

export default LayoutFeed;
