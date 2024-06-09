import React from "react";
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

const GraphContainer: React.FC = () => {
  const data = [
    { t: 0, uv: 10.5, pv: 2.5, amt: 20.5 },
    { t: 1, uv: 10.8, pv: 3.5, amt: 10.5 },
    { t: 2, uv: 11.5, pv: 10.5, amt: 2.5 },
    { t: 3, uv: 12.5, pv: 15.5, amt: 15.2 },
    { t: 4, uv: 15.5, pv: 10.5, amt: 20.3 },
    { t: 5, uv: 18.5, pv: 3.5, amt: 10.6 },
    { t: 6, uv: 22.8, pv: 2.5, amt: 2.5 },
  ];
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="amt" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphContainer;
