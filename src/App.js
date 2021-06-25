import './App.css';
import React from 'react';
import AppBar from './components/AppBar'

function App() {

  const [user, setUser] = React.useState(null);
  const updateUser = (user) => {
    setUser(user)
  }

  return (
    <div className="App">
      <AppBar userAcc={null} getUser={updateUser}/>
    </div>
  );
}

export default App;
