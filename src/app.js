import React from 'react';

import LoginContext from './context/loginContext.js';

import SettingsContext from './context/site.js';
import ToDo from './components/todo/todo.js';
import Header from './components/header.js'

import Login from './components/login.js';
import SignUp from './components/signUp.js';
import Auth from './components/auth/auth.js';

export default function App() {
  return (
    <>
      <LoginContext>
        <Header></Header>
        <Login />
        <SignUp />
        <Auth capability="read">
          <SettingsContext>
            <ToDo />
          </SettingsContext>
        </Auth>

      </LoginContext>
    </>
  );
}