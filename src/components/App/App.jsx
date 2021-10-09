import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
// import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
// import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <BurgerConstructor />
      <BurgerIngredients /> */}
    </div>
  );
}

export default App;
