import React from 'react';
import Log from '../../components/Log';
import styles from './index.module.css';
import MainContainer from './MainContainer';
import SideContainer from './SideContainer';

const Home: React.FC = () => {
  return (
    <div className={styles['home-container']}>
      <SideContainer />
      <MainContainer />
      <Log />
    </div>
  );
};

export default Home;
