import Map from "../../../components/Map";
import BorderBox from "../../../components/UI/BorderBox";
import BorderContainer from "../../../components/UI/BorderContainer";
import styles from "./index.module.css";
import GraphContainer from "../GraphContainer";
import RocketModel from "../../../components/RocketModel";
import { dataProps } from "../../../IUseWebSocket";

interface MainContainerProps {
  data: dataProps;
}

const MainContainer = (props: MainContainerProps) => {
  return (
    <main className={styles["main-container"]}>
      <header>
        <BorderBox
          title="Altura máxima"
          value={`${props.data.maximumAltitude}m`}
        />
        <BorderBox title="Altura atual" value={`${props.data.altitude}m`} />
        <BorderBox
          title="Vel. máxima"
          value={`${props.data.maximumVelocity}m/s`}
        />
        <BorderBox title="Vel. atual" value={`${props.data.velocity}m/s`} />
        <BorderBox
          title="Acc. máxima"
          value={`${props.data.maximumAcceleration}m/s^2`}
        />
        <BorderBox
          title="Acc. atual"
          value={`${props.data.acceleration}m/s^2`}
        />
      </header>
      <section>
        <div className={styles["left-container"]}>
          <BorderContainer.Root title="Medidas inerciais">
            <BorderContainer.Itens
              field="Vel. X"
              value={`${props.data.velocityX}m/s`}
            />
            <BorderContainer.Itens
              field="Vel. Y"
              value={`${props.data.velocityY}m/s`}
            />
            <BorderContainer.Itens
              field="Vel. Z"
              value={`${props.data.velocityZ}m/s`}
            />
            <BorderContainer.Itens
              field="Acc. X"
              value={`${props.data.accelerationX}m/s^2`}
            />
            <BorderContainer.Itens
              field="Acc. Y"
              value={`${props.data.accelerationY}m/s^2`}
            />
            <BorderContainer.Itens
              field="Acc. Z"
              value={`${props.data.accelerationZ}m/s^2`}
            />
          </BorderContainer.Root>
          <div style={{ padding: 10 }}></div>
          <GraphContainer width={350} height={175} graphType={"velocity"}/>
          <GraphContainer width={350} height={175} graphType={"acceleration"}/>
        </div>
        <div className={styles["right-container"]}>
          <GraphContainer width={700} height={280} graphType={"altitude"}/>
          <div className={styles.bottom}>
            <Map
              latitude={props.data.latitude}
              longitude={props.data.longitude}
            />
            <RocketModel q0={0} q1={0} q2={0} q3={0} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContainer;
