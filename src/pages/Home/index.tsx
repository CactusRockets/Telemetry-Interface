import styles from './index.module.css';
import SideContainer from './SideContainer';

const Home = () => {
    return (
        <div className={ styles['home-container'] }>
            <SideContainer />
            <main className={ styles['main-container'] }>

            </main>
        </div>
    )
}

export default Home;