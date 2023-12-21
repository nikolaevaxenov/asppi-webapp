"use client";

import { useQuery } from "react-query";
import { getRC } from "@/services/getData";

export default function SoftwareConditionComponent() {
  const { isLoading, error, data, isFetching } = useQuery("rcData", getRC, {
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных!</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Дата и время</th>
            <th>Процесс</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {!!data[0] ? (
            data[0].map((row) => (
              <tr key={row[1]}>
                <td>{new Date(row[0]).toLocaleString("ru-RU")}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
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
