import React, { useState } from 'react';
import { BiCloudLightning } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications'
import { fetchSession } from '../../../store/session/actions';
import URLS from '../../../constants/urls';
import apiRequests from '../../../utils/apiRequests';
import styles from '../auth.module.less';

const Login = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const dispatch = useDispatch();
  const { addToast } = useToasts()

  const handleLogin = async () => {
    const response = await apiRequests.post(URLS.POST_LOGIN, {
      username, password 
    });
    if(response.data.success){
      dispatch(fetchSession());
      addToast('Logged In Successfully', {
        appearance: 'success',
        autoDismiss: true,
      })
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.background}>
        <div className={styles.logo}>
          <BiCloudLightning />
        </div>
      </div>
      <div className={styles.loginBox}>
        <div className={styles.form}>
          <h5 className={styles.heading}>Member Login</h5>
          <p>Username</p>
          <input type="text" className={styles.username} onChange={(e) =>  setUsername(e.target.value)} />
          <p>Password</p>
          <input type="password" className={styles.password} onChange={(e) =>  setPassword(e.target.value)} />
          <button className={styles.button} onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login;