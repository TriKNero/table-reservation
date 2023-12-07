import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '25px',
    padding: theme.spacing(3),
  },
  textField: {
    marginTop: `${theme.spacing(1)} !important`,
    marginBottom: `${theme.spacing(1)} !important`,
  },
  button: {
    height: '50px',
  },
}));

const Login = ({ setAuthInfo }) => {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState(''); // reserve field for fake password

  const handleLogin = () => {
    if (!login.length || !password.length) return;
    const authInfo = { login };
    localStorage.setItem('auth', JSON.stringify(authInfo));
    setAuthInfo({ login });
  };
  return (
    <div className={classes.container}>
      <Typography variant="h5">Login</Typography>
      <Typography variant="body1">
        Welcome to the Amazing Coffee Shop reservation APP, please login to reserve your seat or table!
      </Typography>
      <div>
        <TextField
          className={classes.textField}
          label="Login"
          variant="outlined"
          fullWidth
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button className={classes.button} variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2">
        Forgot password? Click the <a href="#">next link</a> to see the instruction.
      </Typography>
    </div>
  );
};

export { Login };
