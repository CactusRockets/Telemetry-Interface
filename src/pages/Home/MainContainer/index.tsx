import Map from "../../../components/Map";
import BorderBox from "../../../components/UI/BorderBox";
import BorderContainer from "../../../components/UI/BorderContainer";
import styles from "./index.module.css";
import GraphContainer from "../GraphContainer";
import RocketModel from "../../../components/RocketModel";
import { dataProps } from "../../../IUseWebSocket";

const DECIMAL_AMOUNT = 2;

interface MainContainerProps {
  data: dataProps;
}

const MainContainer = (props: MainContainerProps) => {
  return (
    <main className={styles["main-container"]}>
      <header>
        <BorderBox
          title="Altura máxima"
          value={`${props.data.maximumAltitude.toFixed(DECIMAL_AMOUNT)}m`}
        />
        <BorderBox
          title="Altura atual"
          value={`${props.data.altitude.toFixed(DECIMAL_AMOUNT)}m`}
        />
        <BorderBox
          title="Vel. máxima"
          value={`${props.data.maximumVelocity.toFixed(DECIMAL_AMOUNT)}m/s`}
        />
        <BorderBox
          title="Vel. atual"
          value={`${props.data.velocity.toFixed(DECIMAL_AMOUNT)}m/s`}
        />
        <BorderBox
          title="Acc. máxima"
          value={`${props.data.maximumAcceleration.toFixed(
            DECIMAL_AMOUNT
          )}m/s^2`}
        />
        <BorderBox
          title="Acc. atual"
          value={`${props.data.acceleration.toFixed(DECIMAL_AMOUNT)}m/s^2`}
        />
      </header>
      <section>
        <div className={styles["left-container"]}>
          <BorderContainer.Root title="Medidas inerciais">
            <BorderContainer.Itens
              field="Vel. X"
              value={`${props.data.velocityX.toFixed(DECIMAL_AMOUNT)}m/s`}
            />
            <BorderContainer.Itens
              field="Vel. Y"
              value={`${props.data.velocityY.toFixed(DECIMAL_AMOUNT)}m/s`}
            />
            <BorderContainer.Itens
              field="Vel. Z"
              value={`${props.data.velocityZ.toFixed(DECIMAL_AMOUNT)}m/s`}
            />
            <BorderContainer.Itens
              field="Acc. X"
              value={`${props.data.accelerationX.toFixed(DECIMAL_AMOUNT)}m/s^2`}
            />
            <BorderContainer.Itens
              field="Acc. Y"
              value={`${props.data.accelerationY.toFixed(DECIMAL_AMOUNT)}m/s^2`}
            />
            <BorderContainer.Itens
              field="Acc. Z"
              value={`${props.data.accelerationZ.toFixed(DECIMAL_AMOUNT)}m/s^2`}
            />
          </BorderContainer.Root>
          <div style={{ padding: 10 }}></div>
          <GraphContainer width={350} height={175} graphType={"velocity"} />
          <GraphContainer width={350} height={175} graphType={"acceleration"} />
        </div>
        <div className={styles["right-container"]}>
          <GraphContainer width={700} height={280} graphType={"altitude"} />
          <div className={styles.bottom}>
            <Map
              latitude={props.data.latitude}
              longitude={props.data.longitude}
            />
            <RocketModel
              q0={props.data.quaternion_w}
              q1={props.data.quaternion_x}
              q2={props.data.quaternion_y}
              q3={props.data.quaternion_z}
            />
          </div>
          <p>{`Chave API: `}AIzaSyDmIuEPFOQHVjiMUQ1sbeQ1Dck-1FQT-bQ</p>
        </div>
      </section>
    </main>
  );
};

export default MainContainer;
