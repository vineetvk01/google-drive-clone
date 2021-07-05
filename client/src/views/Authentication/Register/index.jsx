import React, { useState } from 'react';
import { BiCloudLightning } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom';
import { fetchSession } from '../../../store/session/actions';
import { registerUser } from '../requests';
import styles from '../auth.module.less';

const Login = () => {
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts()

  const handleRegister = async () => {
    if(!username || !password) {
      addToast('Empty Values. Please enter credentials.', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    try {
      const response = await registerUser(name, username, password);
      if(response.data.success){
        dispatch(fetchSession());
        addToast('Registered Successfully', {
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
          <h5 className={styles.heading}>Member Signup</h5>
          <p>Name</p>
          <input type="text" className={styles.username} value={name} onChange={(e) =>  setName(e.target.value)} />
          <p>Username</p>
          <input type="text" className={styles.username} value={username} onChange={(e) =>  setUsername(e.target.value)} />
          <p>Password</p>
          <input type="password" className={styles.password} value={password} onChange={(e) =>  setPassword(e.target.value)} />
          <div>
            <button className={styles.button} onClick={handleRegister}>Register</button>
            <button className={styles.button} style={{ width: '200px' }} onClick={() => history.push('/auth/login')}>Login Instead ?</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;