import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
} from "recharts";
import { useWebSocket } from "../../../useWebSocket";
import styles from "./index.module.css";

interface DataGraphFormat {
  index: number;
  sensor1: number;
  sensor2?: number;
  sensor3?: number;
}

interface GraphContainerProps {
  width?: number;
  height?: number;
}

type GraphOptions = "altitude" | "velocity" | "acceleration";

interface GraphContainerPropsModified extends GraphContainerProps {
  graphType: GraphOptions;
}

const GraphContainer = ({
  width = 500,
  height = 300,
  graphType = "altitude",
}: GraphContainerPropsModified) => {
  const { data, isConnected } = useWebSocket(false);
  const [dataList, setDataList] = useState<DataGraphFormat[]>([]);

  const getSensorData = (type: GraphOptions = "altitude"): DataGraphFormat => {
    switch (type) {
      case "altitude":
        return {
          index: dataList.length + 1,
          sensor1: data.altitude,
        };
      case "velocity":
        return {
          index: dataList.length + 1,
          sensor1: data.velocityX,
          sensor2: data.velocityY,
          sensor3: data.velocityZ,
        };
      case "acceleration":
        return {
          index: dataList.length + 1,
          sensor1: data.accelerationX,
          sensor2: data.accelerationY,
          sensor3: data.accelerationZ,
        };
      default:
        return {
          index: dataList.length + 1,
          sensor1: 0,
        };
    }
  };

  useEffect(() => {
    if (isConnected) {
      const formatedData = getSensorData(graphType);

      setDataList((prevDataList) => {
        const updatedDataList =
          prevDataList.length >= 50 ? prevDataList.slice(1) : prevDataList;
        return [...updatedDataList, formatedData];
      });
    } else {
      console.log("Erro: Conexão com ESP comprometida");
    }
  }, [data]);

  let YAxisLabel;
  let GraphTitle;
  if (graphType === "altitude") {
    GraphTitle = "Altitude";
    YAxisLabel = "Altitude";
  }
  if (graphType === "velocity") {
    GraphTitle = "Velocidade Instântanea";
    YAxisLabel = "Velocidade";
  }
  if (graphType === "acceleration") {
    GraphTitle = "Aceleração Instântanea";
    YAxisLabel = "Aceleração";
  }

  return (
    <div style={{ marginTop: 0, marginBottom: 5 }}>
      <h2 className={styles["graph-title"]}>{GraphTitle}</h2>
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          width={730}
          height={250}
          data={dataList}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeWidth={0} stroke="#e0e0e0" strokeOpacity={0.1} />
          <XAxis dataKey="name">
            <Label value="Leitura" dy={0} position="insideBottom" />
          </XAxis>
          <YAxis domain={[0, "auto"]}>
            <Label value={YAxisLabel} dx={-20} angle={-90} position="inside" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="sensor1"
            stroke="#8884d8"
            animateNewValues={false}
          />
          <Line
            type="linear"
            dataKey="sensor2"
            stroke="#82ca9d"
            animateNewValues={false}
          />
          <Line
            type="linear"
            dataKey="sensor3"
            stroke="red"
            animateNewValues={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphContainer;
