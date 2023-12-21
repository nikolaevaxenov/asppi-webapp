"use client";

import { useQuery } from "react-query";
import { getCL, getDA1 } from "@/services/getData";
import styles from "@/styles/stateOfThePowerUnitComponent.module.scss";

export default function StateOfThePowerUnitComponent() {
  const {
    isLoading: isLoadingCL,
    error: errorCL,
    data: dataCL,
    isFetching: isFetchingCL,
  } = useQuery("clData", getCL, {
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });
  const {
    isLoading: isLoadingDA1,
    error: errorDA1,
    data: dataDA1,
    isFetching: isFetchingDA1,
  } = useQuery("da1Data", getDA1, {
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });

  if (isLoadingCL || isFetchingCL || isLoadingDA1 || isFetchingDA1)
    return <div>Загрузка...</div>;
  if (errorCL || errorDA1) return <div>Ошибка загрузки данных!</div>;

  return (
    <div className={styles.main}>
      {!!dataCL[0] && !!dataDA1[0] ? (
        <div>
          {dataCL[0][0][1] !== "1899-12-30T00:00:00" && (
            <p>
              Дата/время окончания предыдущего расчета:{" "}
              {new Date(dataCL[0][0][1].toLocaleString("ru-RU")).toLocaleString(
                "ru-RU"
              )}
            </p>
          )}
          {dataCL[0][1][1] !== "1899-12-30T00:00:00" && (
            <p>
              Дата/время окончания расчета:{" "}
              {new Date(dataCL[0][1][1].toLocaleString("ru-RU")).toLocaleString(
                "ru-RU"
              )}
            </p>
          )}
          {dataDA1[0][0][1] !== "1899-12-30T00:00:00" && (
            <p>
              Дата/время сохранения таблицы DA:{" "}
              {new Date(
                dataDA1[0][0][1].toLocaleString("ru-RU")
              ).toLocaleString("ru-RU")}
            </p>
          )}
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
      <table>
        <thead>
          <tr>
            <th>Параметр</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {!!dataCL[0] ? (
            dataCL[0]
              .slice(2)
              .filter((row) => row[1] !== 0 && row[1] !== "1899-12-30T00:00:00")
              .map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{Math.round(row[1] * 100) / 100}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td>Загрузка...</td>
            </tr>
          )}
          {!!dataDA1[0] ? (
            dataDA1[0]
              .slice(1)
              .filter((row) => row[1] !== 0 && row[1] !== "1899-12-30T00:00:00")
              .map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{Math.round(row[1] * 100) / 100}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td>Загрузка...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
