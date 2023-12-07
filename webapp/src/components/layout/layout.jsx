import React from 'react';
import Paper from '@mui/material/Paper';

const Layout = ({ children }) => {
  const styles = {
    paper: {
      padding: '30px',
      margin: '50px',
      width: '500px',
      minHeight: '60vh',
    },
    wrapper: {
      display: 'grid',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
      background: 'linear-gradient(to bottom, #3E2723, #A1887F)',
    },
  };
  return (
    <div style={styles.wrapper}>
      <Paper style={styles.paper} component="div" elevation={3}>
        {children}
      </Paper>
    </div>
  );
};

export { Layout };
