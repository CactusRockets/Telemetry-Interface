import React, { useState } from 'react';
import Log from '../../components/Log';
import styles from './index.module.css';
import MainContainer from './MainContainer';
import SideContainer from './SideContainer';

const Home: React.FC = () => {

  const [data, setData] = useState({});
  const onDataChange = (data: {}) => {
    setData(data);
  }

  return (
    <div className={styles['home-container']}>
      <SideContainer data={data} />
      <MainContainer data={data} />
      <Log onDataChange={onDataChange} />
    </div>
  );
};

export default Home;
