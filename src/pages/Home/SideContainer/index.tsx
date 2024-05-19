import styles from './index.module.css';
import cactusIcon from '../../../assets/cactus-logo.png';
import SkibBox from '../../../components/UI/SkibBox';
import BorderContainer from '../../../components/UI/BorderContainer';

const SideContainer = () => {
    return (
        <div className={ styles['side-container'] }>
            <img src={ cactusIcon } alt="" />
            <section>
                <div className={ styles['skibs-container'] }>
                    <SkibBox text='SKIB 1' activated />
                    <SkibBox text='SKIB 2' />
                </div>
                <BorderContainer.Root title='Foguete'>
                    <BorderContainer.Itens field='Motor' value={'Tipo J'} className={ styles['container-item'] } />
                    <BorderContainer.Itens field='Massa' value={'2.87Kg'} className={ styles['container-item'] } />
                    <BorderContainer.Itens field='Altura' value={'1.78m'} className={ styles['container-item'] } />
                    <BorderContainer.Itens field='CP' value={'1.24m'} className={ styles['container-item'] } />
                    <BorderContainer.Itens field='CM' value={'1.65m'} className={ styles['container-item'] } />
                </BorderContainer.Root>
            </section>
            <footer>
                <p>Cactus Rocket</p>
            </footer>
        </div>
    )
}

export default SideContainer;