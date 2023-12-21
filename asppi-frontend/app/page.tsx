import styles from "@/styles/homePage.module.scss";
import SoftwareConditionComponent from "@/components/SoftwareConditionComponent";
import StateOfThePowerUnitComponent from "@/components/StateOfThePowerUnitComponent";
import MainParametersChartComponent from "@/components/MainParametersChartComponent";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1>Состояние программ АСППИ</h1>
      <SoftwareConditionComponent />

      <h1>Графики основных параметров</h1>
      <MainParametersChartComponent />

      <h1>Текущие нейтронно-физические характеристики</h1>
      <StateOfThePowerUnitComponent />
    </div>
  );
}
