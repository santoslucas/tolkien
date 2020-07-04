import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

import './signin.scss';
import { UserContext } from '../../UserProvider';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const { user, loadingAuth } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  });

  const onClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <form className="signin__wrapper" onSubmit={onClickEnter}>
      <TextField
        id="email"
        type="text"
        label="E-mail"
        style={{ marginBottom: '8px' }}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        id="password"
        type="password"
        label="Senha"
        style={{ marginBottom: '16px' }}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Entrar
      </Button>
      <p className="signin__error">{error}</p>
    </form>
  );
};

export default SignIn;
