import styles from "@/styles/homePage.module.scss";
import SoftwareConditionComponent from "@/components/SoftwareConditionComponent";
import StateOfThePowerUnitComponent from "@/components/StateOfThePowerUnitComponent";
import MainParametersChartComponent from "@/components/MainParametersChartComponent";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1>Состояние программ АСППИ</h1>
      <SoftwareConditionComponent />

      <h1>Текущее состояние энергоблока</h1>
      <StateOfThePowerUnitComponent />

      <h1>График основных параметров</h1>
      <MainParametersChartComponent />
    </div>
  );
}
