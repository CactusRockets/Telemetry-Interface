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
} from "recharts";
import { useWebSocket } from "../../../useWebSocket";

interface DataGraphFormat {
  index: number;
  sensor1: number;
  sensor2: number;
  sensor3?: number;
}

const GraphContainer: React.FC = () => {
  const { data, isConnected } = useWebSocket(true);
  const [dataList, setDataList] = useState<DataGraphFormat[]>([]);

  useEffect(() => {
    const formatedData: DataGraphFormat = {
      index: dataList.length + 1,
      sensor1: data.sensor1,
      sensor2: data.sensor2,
      sensor3: data.sensor3,
    };

    setDataList((prevDataList) => {
      const updatedDataList =
        prevDataList.length >= 20 ? prevDataList.slice(1) : prevDataList;
      return [...updatedDataList, formatedData];
    });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={730}
        height={250}
        data={dataList}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sensor1" stroke="#8884d8" />
        <Line type="monotone" dataKey="sensor2" stroke="#82ca9d" />
        <Line type="monotone" dataKey="sensor3" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphContainer;
