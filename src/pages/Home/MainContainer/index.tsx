import Map from '../../../components/Map';
import BorderBox from '../../../components/UI/BorderBox';
import BorderContainer from '../../../components/UI/BorderContainer';
import styles from './index.module.css';
import GraphContainer from '../GraphContainer';

const MainContainer = () => {
    return (
        <main className={ styles['main-container'] }>
            <header>
                <BorderBox title='Altura máxima' value={'1500m'} />
                <BorderBox title='Altura atual' value={'1500m'} />
                <BorderBox title='Vel. máxima' value={'15.00m/s'} />
                <BorderBox title='Vel. atual' value={'15.00m/s'} />
                <BorderBox title='Acc. máxima' value={'15.00m/s^2'} />
                <BorderBox title='Acc. atual' value={'15.00m/s^2'} />
            </header>
            <section>
                <div className={ styles['left-container'] }>
                    <BorderContainer.Root title='Medidas inerciais'>
                        <BorderContainer.Itens field='Vel. X' value={'15m/s'} />
                        <BorderContainer.Itens field='Vel. Y' value={'15m/s'} />
                        <BorderContainer.Itens field='Vel. Z' value={'15m/s'} />
                        <BorderContainer.Itens field='Acc. X' value={'15m/s^2'} />
                        <BorderContainer.Itens field='Acc. Y' value={'15m/s^2'} />
                        <BorderContainer.Itens field='Acc. Z' value={'15m/s^2'} />
                    </BorderContainer.Root>
                </div>
                <div className={ styles['right-container'] }>
                    {/* Gráfico */}
                    <div className={ styles.bottom }>
                        <Map latitude={-9.4126997} longitude={-40.5152325} />
                        {/* 3d */}
                    </div>
                </div>
            </section>
            <GraphContainer />
        </main>
    )
}

export default MainContainer;