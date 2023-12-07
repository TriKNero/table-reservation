import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './app.jsx';
import { Header } from './components/header/header.jsx';
import { Layout } from './components/layout/layout.jsx';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header label={'The Amazing Coffee Shop'} />
      <Layout>
        <App />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>,
);
