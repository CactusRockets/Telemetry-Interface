import React, { useEffect, useState } from "react";
import { useWebSocket } from "../../../useWebSocket";
import * as d3 from "d3";

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
  graphType = "altitude",
}: GraphContainerPropsModified) => {
  const { data, isConnected } = useWebSocket(true);
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

  useEffect(() => {
    // Função para desenhar o gráfico usando D3.js
    const drawChart = () => {
      // Remove gráfico existente antes de desenhar um novo
      d3.select("#chart-container").selectAll("*").remove();

      // Dados
      const sensorData = dataList.map((d) => ({
        index: d.index.toString(),
        sensor1: d.sensor1,
        sensor2: d.sensor2,
        sensor3: d.sensor3,
      }));

      // Configurações do gráfico
      const margin = { top: 20, right: 30, bottom: 30, left: 60 };
      const width = 730 - margin.left - margin.right;
      const height = 250 - margin.top - margin.bottom;

      const svg = d3
        .select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Escalas
      const x = d3
        .scaleBand()
        .domain(sensorData.map((d) => d.index))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear().domain([0, 100]).nice().range([height, 0]);

      // Eixos
      const xAxis = d3.axisBottom(x);
      svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

      const yAxis = d3.axisLeft(y);
      svg.append("g").call(yAxis);

      // Linhas
      const line1 = d3
        .line<DataGraphFormat>()
        .x((d) => x(d.index || 0) + x.bandwidth() / 2)
        .y((d) => y(d.sensor1 || 0))
        .curve(d3.curveLinear);

      const line2 = d3
        .line<DataGraphFormat>()
        .x((d) => x(d.index.toString()) + x.bandwidth() / 2)
        .y((d) => y(d.sensor2 || 0))
        .curve(d3.curveLinear);

      const line3 = d3
        .line<DataGraphFormat>()
        .x((d) => x(d.index.toString()) + x.bandwidth() / 2)
        .y((d) => y(d.sensor3 || 0))
        .curve(d3.curveLinear);

      svg
        .append("path")
        .datum(sensorData)
        .attr("fill", "none")
        .attr("stroke", "#8884d8")
        .attr("stroke-width", 1.5)
        .attr("d", line1);

      svg
        .append("path")
        .datum(sensorData)
        .attr("fill", "none")
        .attr("stroke", "#82ca9d")
        .attr("stroke-width", 1.5)
        .attr("d", line2);

      svg
        .append("path")
        .datum(sensorData)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", line3);
    };

    // Chama a função para desenhar o gráfico sempre que dataList ou graphType mudar
    drawChart();

    // Retorna uma função de limpeza para remover o gráfico ao desmontar o componente
    return () => {
      d3.select("#chart-container").selectAll("*").remove();
    };
  }, [dataList, graphType]);

  return (
    <>
      <h2 className={styles["graph-title"]}>{GraphTitle}</h2>

      <div id="chart-container"></div>
    </>
  );
};

export default GraphContainer;
