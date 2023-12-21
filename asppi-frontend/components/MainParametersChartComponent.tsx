"use client";

import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getWT } from "@/services/getData";

export default function MainParametersChartComponent() {
  const { isLoading, error, data, isFetching } = useQuery("wtData", getWT, {
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных!</div>;

  const resultArray = data.map((row) => {
    return {
      "Дата/время": row[1],
      Мощность: row[3],
      "Концентрация ксенона 135": row[5],
      "Концентрация йода 135": row[7],
    };
  });

  const chartData = resultArray.reverse();
  console.log(chartData);

  return (
    <div>
      <ResponsiveContainer height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 150,
            left: 150,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Дата/время" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("ru-RU", {
                notation: "compact",
                compactDisplay: "short",
              }).format(value)
            }
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Мощность" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 150,
            left: 150,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Дата/время" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("ru-RU", {
                notation: "compact",
                compactDisplay: "short",
              }).format(value)
            }
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Концентрация ксенона 135"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 150,
            left: 150,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Дата/время" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("ru-RU", {
                notation: "compact",
                compactDisplay: "short",
              }).format(value)
            }
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Концентрация йода 135"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
