import React, { useState } from "react";
import Log from "../../components/Log";
import styles from "./index.module.css";
import MainContainer from "./MainContainer";
import SideContainer from "./SideContainer";
import { defaultData } from "../../useWebSocket";
import { dataProps } from "../../IUseWebSocket";

const Home: React.FC = () => {
  const [data, setData] = useState(defaultData);
  const onDataChange = (data: dataProps) => {
    setData(data);
  };

  return (
    <div className={styles["home-container"]}>
      <SideContainer data={data} />
      <MainContainer data={data} />
      <Log onDataChange={onDataChange} />
    </div>
  );
};

export default Home;
