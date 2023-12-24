"use client";

import styles from "@/styles/mainParametersChartComponent.module.scss";
import Carousel from "nuka-carousel";
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
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export default function MainParametersChartComponent() {
  const { isLoading, error, data, isFetching } = useQuery("wtData", getWT, {
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных!</div>;

  const convertData = (inputData) => {
    const outputData = {};

    for (const key in inputData) {
      outputData[key] = inputData[key].map((row) => {
        const newRow = {};
        for (let i = 0; i < row.length; i += 2) {
          newRow[row[i]] = row[i + 1];
        }
        return newRow;
      });
    }

    return outputData;
  };

  const chartData = convertData(data);

  return (
    <div className={styles.main}>
      <Carousel
        renderBottomCenterControls={false}
        renderCenterLeftControls={({ previousSlide }) => (
          <button onClick={previousSlide}>
            <IoIosArrowDropleftCircle />
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button onClick={nextSlide}>
            <IoIosArrowDroprightCircle />
          </button>
        )}
      >
        {!!data ? (
          Object.keys(chartData).map((key) => {
            console.log(chartData[key]);
            return (
              <div>
                <p>Информация по блоку {key}</p>
                <div className={styles.charts}>
                  <ResponsiveContainer height={300}>
                    <LineChart
                      data={chartData[key]}
                      margin={{
                        right: 10,
                        left: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Дата/время" />
                      <YAxis
                        tickFormatter={(value) =>
                          Number.parseFloat(value).toExponential()
                        }
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Мощность"
                        stroke="#fbf8cc"
                        strokeWidth={5}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <ResponsiveContainer height={300}>
                    <LineChart
                      data={chartData[key]}
                      margin={{
                        right: 10,
                        left: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Дата/время" />
                      <YAxis
                        tickFormatter={(value) =>
                          Number.parseFloat(value).toExponential()
                        }
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Концентрация ксенона 135"
                        stroke="#f1c0e8"
                        strokeWidth={5}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <ResponsiveContainer height={300}>
                    <LineChart
                      data={chartData[key]}
                      margin={{
                        right: 10,
                        left: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Дата/время" />
                      <YAxis
                        tickFormatter={(value) =>
                          Number.parseFloat(value).toExponential()
                        }
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Концентрация йода 135"
                        stroke="#ffd166"
                        strokeWidth={5}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })
        ) : (
          <tr>
            <td>Загрузка...</td>
          </tr>
        )}
      </Carousel>
    </div>
  );
}
