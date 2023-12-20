"use client";

import { useQuery } from "react-query";
import { getCL, getDA1 } from "@/services/getData";

export default function StateOfThePowerUnitComponent() {
  const {
    isLoading: isLoadingCL,
    error: errorCL,
    data: dataCL,
    isFetching: isFetchingCL,
  } = useQuery("clData", getCL);
  const {
    isLoading: isLoadingDA1,
    error: errorDA1,
    data: dataDA1,
    isFetching: isFetchingDA1,
  } = useQuery("da1Data", getDA1);

  if (isLoadingCL || isFetchingCL || isLoadingDA1 || isFetchingDA1)
    return <div>Загрузка...</div>;
  if (errorCL || errorDA1) return <div>Ошибка загрузки данных!</div>;

  return (
    <div>
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
              .filter((row) => row[1] !== 0 && row[1] !== "1899-12-30T00:00:00")
              .map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td>Загрузка...</td>
            </tr>
          )}
          {!!dataDA1[0] ? (
            dataDA1[0]
              .filter((row) => row[1] !== 0 && row[1] !== "1899-12-30T00:00:00")
              .map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
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
