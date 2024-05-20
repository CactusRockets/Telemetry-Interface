import styles from './index.module.css';
import MainContainer from './MainContainer';
import SideContainer from './SideContainer';

const Home = () => {
    return (
        <div className={ styles['home-container'] }>
            <SideContainer />
            <MainContainer />
        </div>
    )
}

export default Home;