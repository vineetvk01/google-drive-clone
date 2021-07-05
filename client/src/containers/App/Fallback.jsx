import React from 'react';
import spinImage from '../../assets/spin.svg';
import styles from './styles.module.less';

const Fallback = () => {

  return (
    <div className={styles.loadingContainer}>
      <img src={spinImage} alt="loading" width="80px"/>
    </div>
  )
}

export default Fallback;