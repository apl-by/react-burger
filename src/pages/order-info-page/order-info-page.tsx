import styles from "./order-info-page.module.css";
import { FC, useMemo } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import OrderInfo from "../../components/modal/order-info/order-info";
import { useSelector } from "../../hooks/reduxHooks";
import { handleOrder } from "../../utils/utils";
import { IHandeledOrder } from "../../types/common";

const OrderInfoPage: FC = () => {
  const location = useLocation();
  const param = useParams();
  const ordersAll = useSelector((state) => state.orders.resAll);
  const ordersOwner = useSelector((state) => state.orders.resOwner);
  const menu = useSelector((state) => state.menu.menu);
  const isProfilePage = location.pathname.includes("profile");

  const order = useMemo(() => {
    const orders = isProfilePage ? ordersOwner?.orders : ordersAll?.orders;
    return orders?.find((i) => i.number === Number(param?.id));
  }, [param, ordersAll, ordersOwner, isProfilePage]);

  let handledOrder: IHandeledOrder | undefined = undefined;

  if (order && menu) {
    handledOrder = handleOrder(order, menu);
  }

  if (isProfilePage && ordersOwner && !order) {
    return <Navigate to="*" />;
  }
  if (!isProfilePage && ordersAll && !order) {
    return <Navigate to="*" />;
  }

  return (
    <>
      {handledOrder && (
        <section className={styles.section}>
          <h1 className={`${styles.title} text text_type_digits-default`}>
            {`#${handledOrder.number}`}
          </h1>
          <OrderInfo order={handledOrder} />
        </section>
      )}
    </>
  );
};

export default OrderInfoPage;
