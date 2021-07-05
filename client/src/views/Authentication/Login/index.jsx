import React, { useState } from 'react';
import { BiCloudLightning } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom';
import { fetchSession } from '../../../store/session/actions';
import URLS from '../../../constants/urls';
import apiRequests from '../../../utils/apiRequests';
import styles from '../auth.module.less';

const Login = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts()

  const handleLogin = async () => {
    if(!username || !password) {
      addToast('Empty Values. Please enter credentials.', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    try {
      const response = await apiRequests.post(URLS.POST_LOGIN, {
        username, password 
      });
      if(response.data.success){
        dispatch(fetchSession());
        addToast('Logged In Successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
      } else {
        addToast('Wrong Credentials. Please try again.', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    }catch(e){
      addToast('Wrong Credentials. Please try again.', {
        appearance: 'error',
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
          <p className={styles.demoCred}>Use:  demo | demo</p>
          <p>Username</p>
          <input type="text" className={styles.username} onChange={(e) =>  setUsername(e.target.value)} />
          <p>Password</p>
          <input type="password" className={styles.password} onChange={(e) =>  setPassword(e.target.value)} />
          <div>
            <button className={styles.button} onClick={handleLogin}>Login</button>
            <button className={styles.button} onClick={() => history.push('/auth/signUp')}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;