import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import { useParams, useNavigate } from "react-router";
import { FC } from "react";

const ModalIngrDetailPage: FC = () => {
  const param = useParams();
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/", { replace: true });
  };
  return (
    <Modal title="Детали ингредиента" onClose={closeModal}>
      <IngredientDetails id={param.id as string} />
    </Modal>
  );
};

export default ModalIngrDetailPage;
