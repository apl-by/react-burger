import OrderInfo from "../../components/modal/order-info/order-info";
import Modal from "../../components/modal/modal";
import { useNavigate, useLocation } from "react-router";
import { FC } from "react";
import { IHandeledOrder } from "../../types/common";

const ModalOrderInfoPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order: IHandeledOrder = location.state?.order;

  const closeModal = () => {
    navigate(location.state?.background, { replace: true });
  };
  return (
    <Modal
      title={`#${order.number}`}
      modTitle={"text_type_digits-default"}
      onClose={closeModal}
    >
      <OrderInfo order={order} />
    </Modal>
  );
};

export default ModalOrderInfoPage;
