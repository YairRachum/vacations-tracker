import React from 'react';
import './App.css';
import Layout from './components/layout/Layout';
import "./styles/Main.scss"
import Notification from './components/notification/Notification';
import { useSelector } from 'react-redux';
import { AppState } from './redux/AppState';
import "animate.css"



function App() {
  const { message, type } = useSelector((state: AppState) => state.notification);

  return (
    <div className="App">
      <div id="notification-root">

      </div>
      {message && <Notification message={message} type={type} />}

      <Layout />
    </div>
  );
}

export default App;
