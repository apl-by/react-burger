import styles from "./ingr-detail-page.module.css";
import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";
import { useParams } from "react-router";

const IngrDetailPage = () => {
  const param = useParams();
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
      <IngredientDetails id={param.id}/>
    </div>
  );
};

export default IngrDetailPage;
