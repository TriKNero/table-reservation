import React, { useState } from 'react';
import { ReservationForm } from './components/reservation-form/reservation-form.jsx';
import { Login } from './components/login/login.jsx';

const App = () => {
  const auth = localStorage.getItem('auth');
  const [authInfo, setAuthInfo] = useState(JSON.parse(auth) || '');
  if (!authInfo) return <Login setAuthInfo={setAuthInfo} />;
  return (
    <ReservationForm
      authInfo={authInfo}
      logout={() => {
        setAuthInfo('');
        localStorage.clear();
      }}
    />
  );
};

export default App;
